# Midi technique - Kubernetes (démo - k8s)

Ce dossier contient deux fichiers YAML pour les déploiements de chacune de ces parties dans Kubernetes :
- "back-deployment.yaml" permet de créer un objet de type Deployment dans Kubernetes en utilisant l'image du registry local docker "localhost:5000/fdelbrayelle/back:latest" sur le port 8080.
- "front-deployment.yaml" permet de créer un objet de type Deployment dans Kubernetes en utilisant l'image du registry local docker "localhost:5000/fdelbrayelle/front:latest" sur le port 8081.
