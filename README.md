# Midi technique - Kubernetes

<p align="center"><img src="https://github.com/fdelbrayelle/midi-tech-k8s/blob/master/slides/src/images/k8s.png" width="50%" /></p>

Ce dépôt contient les [slides](https://github.com/fdelbrayelle/midi-tech-k8s/blob/master/slides) et la [démo](https://github.com/fdelbrayelle/midi-tech-k8s/blob/master/demo) du midi technique effectué le mercredi 3 juillet 2019 chez Gfi Informatique.

Dans un premier temps, l'historique des containers dans le monde de l'informatique a été présenté puis un rappel des bases de Docker a été effectué. Ceci a permis d'amener le sujet vers Kubernetes (k8s) et de montrer son utilité pour orchestrer les containers. Une démo a été effectuée pour créer des containers Docker (1 back, 2 fronts), les faire communiquer ensemble via Kubernetes et les exécuter sur une machine locale.

En complément, le service mesh Istio et l'outil CI/CD Jenkins X ont également été évoqués.

Les supports peuvent être librement modifiés et réutilisés. Les slides ont également été [exportés au format PDF](https://github.com/fdelbrayelle/midi-tech-k8s/blob/master/slides/presentation.pdf).

## Étapes de la démo (Docker)

Présenter le mode interactif de lancement d'un container docker avec par exemple `docker run -it alpine` ou `docker run -it ubuntu` et montrer que pour certaines images il faut des informations comme pour `docker run -it mysql`.

La suite de la démo suppose que docker et docker-compose sont déjà installés sur le système.

Prérequis :
- Vérifier que dockerd est activé et tourne avec `sudo systemctl enable docker.service`, `sudo service docker status` sinon `sudo service docker start`
- Lancer un registry local avec ` docker run -d -p 5000:5000 --restart=always --name registry registry:2`

### Utiliser Docker sur le back

- Se rendre dans le dossier du projet Spring Boot (`cd back`) et ouvrir le Dockerfile du projet pour l'expliquer
- Lancer un `mvn clean package` pour générer le jar de l'application dans le dossier target
- Créer une image Docker du back : `docker -t back build .`
- Vérifier que l'image a été créée : `docker image ls`
- Lancer le container :  `docker run -p 8080:8080 back`
- Tester le back en ajoutant une bière : `curl -H 'Content-Type: application/json' -X POST -d '{ "id": "1", "name": "Anosteké", "brewery": "Brasserie du Pays Flamand" }' localhost:8080/beers` et en récupérant la liste des bières : `curl localhost:8080/beers`
- Pousser l'image sur le registry local : `docker login localhost:5000` pour se connecter puis `docker tag 6de55d87b083 localhost:5000/fdelbrayelle/back:latest` pour le tag et `docker push localhost:5000/fdelbrayelle/back:latest` pour pousser l'image
- Vérifier que l'image est présente dans le registry : `gio open http://localhost:5000/v2/_catalog`

### Utiliser Docker sur le front

- Se rendre dans le dossier du projet Angular (`cd ../angular-front`) et ouvrir le Dockerfile du projet pour l'expliquer
- Créer une image Docker du front Angular : `docker -t angular-front build .`
- Vérifier que l'image a été créée : `docker image ls`
- Lancer le container :  `docker run -p 8081:80 angular-front`
- Ouvrir un navigateur pour vérifier que l'application est bien lancée : `gio open https://localhost:8081`
- Pousser l'image sur le registry local : `docker login localhost:5000` pour se connecter puis `docker tag dfdca0242ce6 localhost:5000/fdelbrayelle/front:latest` pour le tag et `docker push localhost:5000/fdelbrayelle/front:latest` pour pousser l'image
- Vérifier que l'image est présente dans le registry : `gio open http://localhost:5000/v2/_catalog`

## Étapes de la démo (Kubernetes)

Il est nécessaire d'effectuer certaines actions avant de pouvoir tester Kubernetes en local.

[Installer les commandes nécessaires](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl) comme indiqué sur le site officiel.

### Initialiser le cluster et le node master

- Vérifier que les outils kubeadm, kubectl et kubelet sont bien installés
- Désactiver le swap si besoin avec `sudo swapoff -a` pour que le service kubelet puisse fonctionner
- Activer et démarrer kubelet avec `sudo systemctl enable kubelet` puis `sudo systemctl start kubelet` (pour éviter une erreur de ce type : "The connection to the server a.b.c.d:1234 was refused...")
- Télécharger l'outil [dind-cluster](https://github.com/kubernetes-sigs/kubeadm-dind-cluster) pour gérer plusieurs nodes sur une même machine
- [Installer le control plane de Kubernetes](https://kubernetes.io/docs/reference/setup-tools/kubeadm/kubeadm-init/) et initialiser un cluster avec `sudo ./dind-cluster-v1.13.sh init` (équivalent à `sudo kubeadm init`, génère la configuration dans /etc/kubernetes : utilisée par kubelet, le controller manager et le scheduler pour se connecter au API server)
- Lancer la commande `kubectl get services` pour vérifier que le cluster est bien créé
- [Installer un add-on réseau](https://kubernetes.io/fr/docs/setup/independent/create-cluster-kubeadm/#pod-network) (un seul par cluster) pour faire communiquer les pods entre eux, par exemple : `kubectl apply -f https://docs.projectcalico.org/v3.7/manifests/calico.yaml`
- Copier la configuration dans le dossier personnel : `mkdir -p $HOME/.kube && sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config && sudo chown $(id -u):$(id -g) $HOME/.kube/config`
- Lire la configuration locale de Kubernetes : `kubectl config view` ou `cat $HOME/.kube/config`
- Montrer la liste des nodes (et la possibilité d'abréger les commandes) avec `k get no`

Il est nécessaire d'effectuer plusieurs opérations pour pour utiliser le node master (et ne pas avoir à gérer un node worker) :
- Lancer la commande suivante pour "déteinter" le node master et lui permettre de gérer des pods : `kubectl taint nodes --all node.kubernetes.io/not-ready:NoSchedule-`
- Installer [flannel](https://github.com/coreos/flannel) (`sudo kubeadm init` n'initialise que coredns mais pas flannel) pour configurer une [implémentation du réseau sur Kubernetes](https://blog.laputa.io/kubernetes-flannel-networking-6a1cb1f8ec7c) avec `kubectl -n kube-system apply -f https://raw.githubusercontent.com/coreos/flannel/bc79dd1505b0c8681ece4de4c0d86c5cd2643275/Documentation/kube-flannel.yml`
- Éventuellement supprimer les pods si existant avec `kubectl delete pod [pod-name]` (les lister avec `kubectl get pods`)
- [Ajouter la configuration flannel](https://github.com/kubernetes/kubernetes/issues/70202) avec `sudo mkdir -p /run/flannel && sudo vim /run/flannel/subnet.env` et y ajouter le contenu suivant :

```
FLANNEL_NETWORK=10.244.0.0/16
FLANNEL_SUBNET=10.244.0.1/24
FLANNEL_MTU=1450
FLANNEL_IPMASQ=true
```

- Ajouter un secret pour le docker registry : `kubectl create secret docker-registry my-secret --docker-server=localhost:5000 --docker-username=fdelbrayelle --docker-password=NO_WAY`

### Déployer le back

- Créer un nouveau déploiement pour le back avec `kubectl run back-deployment --image=back --port=8080 --replicas=1` (cette commande est dépréciée et sera retirée dans une future version, il faut donc préférer `kubectl create -f k8s/back-deployment.yaml` et utiliser `kubectl explain [ressource]` pour obtenir une description des ressources possibles)
- Vérifier que le déploiement est bien ajouté avec `kubectl get deployments` puis `kubectl describe deployment back-deployment` pour avoir plus de détails
- Exposer le pod avec `kubectl expose pod back-deployment-6749497fd9-kdfz8 --type=NodePort --name=back-service`
- Vérifier que le déploiement est bien exposé en tant que service avec `kubectl get services`
- Port-forwarder le pod : `kubectl port-forward back-deployment-86c67cd4f9-rj7jh 8080:8080`
- Montrer la possibilité de scaler un déploiment avec par exemple `kubectl scale deployment/back-deployment --replicas=2`
- Tester en récupérant la liste des bières : `curl localhost:8080/beers`

### Déployer le front

- Créer un nouveau déploiement pour le front avec `kubectl run front-deployment --image=back --port=8080 --replicas=1` (cette commande est dépréciée et sera retirée dans une future version, il faut donc préférer `kubectl create -f k8s/front-deployment.yaml` et utiliser `kubectl explain [ressource]` pour obtenir une description des ressources possibles)
- Vérifier que le déploiement est bien ajouté avec `kubectl get deployments` puis `kubectl describe deployment front-deployment` pour avoir plus de détails
- Exposer le pod avec `kubectl expose pod front-deployment-cc47df644-8whlc --type=NodePort --name=front-service`
- Vérifier que le déploiement est bien exposé en tant que service avec `kubectl get services`
- Port-forwarder le pod : `kubectl port-forward front-deployment-75d6fff956-8n95v 8081:8081` (KO malgré les packages "socat" et "nsenter" installés) :
```
Handling connection for 8081
E0702 22:43:40.373075   25318 portforward.go:400] an error occurred forwarding 8081 -> 8081: error forwarding port 8081 to pod fae05d8476983a92e64ea37b9528b1cf40d1e4f32a1f15f8da702810175322bb, uid : exit status 1: 2019/07/02 22:43:40 socat[25457] E connect(5, AF=2 127.0.0.1:8081, 16): Connection refused
```
- Montrer la possibilité de lire les logs avec `kubectl logs front-deployment-75d6fff956-pvns4`
- Tester en ouvrant l'application : `gio open https://localhost:8081`

### Tester Web UI Dashboard (bonus)

Lancer la commande `kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml` puis `kubectl proxy` et ouvrir l'URL http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/ dans un navigateur (cela ne fonctionnera que si un pod a été initialisé après la création du cluster).

### Minikube (alternative non montrée en démo)

Il est également possible d'orchestrer les containers via un cluster Kubernetes créé avec Minikube :

- Installer VirtualBox avec `sudo apt install virtualbox virtualbox-dkms virtualbox-ext-pack`
- [Installer minikube](https://kubernetes.io/docs/tasks/tools/install-minikube) avec la commande suivante : `curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 && chmod +x minikube && sudo install minikube /usr/local/bin`
- Supprimer si besoin la précédente instance de minikube avec `sudo minikube delete -p minikube`
- Créer un cluster local avec `sudo minikube start` et tester [d'autres commmandes](https://github.com/kubernetes/minikube#quick-start) si nécessaire
