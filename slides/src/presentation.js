// Import React
import React from 'react';

// Import Spectacle Core tags
import {
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
  Image,
  Code,
  Notes,
  Appear,
} from 'spectacle';

// Import theme
import createTheme from 'spectacle/lib/themes/default';

// Require CSS
require('normalize.css');

const theme = createTheme(
  {
    primary: 'white',
    secondary: '#1F2022',
    tertiary: '#fd8224',
    quaternary: '#CECECE',
    quinary: 'yellow'
  },
  {
    primary: 'Montserrat',
    secondary: 'Helvetica',
  }
);

const images = {
  tux: require("./images/tux.png"),
  dockerLogo: require("./images/docker.png"),
  k8sLogo: require("./images/k8s.png"),
  jenkinsXLogo: require("./images/jenkins-x.png"),
  comparaison: require("./images/comparaison.png"),
  dockerArchitecture: require("./images/docker-architecture.svg"),
  dockerfile: require("./images/dockerfile.png"),
  container: require("./images/container.jpg"),
  comparaisonDocker: require("./images/comparaisonDocker.png"),
  k8sArchitecture: require("./images/k8sArchitecture.png"),
  webui: require("./images/webui.png"),
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['zoom', 'slide']}
        transitionDuration={500}
        theme={theme}
      >
        <Slide transition={['zoom']} bgColor="tertiary">
          <Heading size={1} fit caps lineHeight={1} textColor="primary">
            Midi tech
          </Heading>
          <Text margin="10px 0 0" textColor="quinary" size={1} fit bold>
            Kubernetes, pour orchestrer nos containers
          </Text>
          <Text margin="200px 0 0" textColor="primary" textSize="24" bold>
            François Delbrayelle (@fdelbrayelle)
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Bienvenue !
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Midis techniques S03E04</ListItem>
            <Appear><ListItem margin="30px 0 0">Vous aussi vous pouvez en faire ;-) !</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Présentation puis démo</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="green" bold>Sondage debout : qui utilise les containers, Docker, Kubernetes... ?</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="secondary" textColor="primary">
          <Heading size={1}>Les containers ?</Heading>
          <Image margin="75px 275px" src={images.tux} height="400px"></Image>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Le monde réel
          </Heading>
          <Image margin="60px 0" src={images.container}></Image>
          <Text>Inventé en 1956 par Malcom McLean</Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Historique (1/2)
          </Heading>
          <List>
            <ListItem margin="60px 0 0">1979 : <Code>chroot</Code> (Unix V7) pour isoler le répertoire racine d'un processus et ses fils</ListItem>
            <Appear><ListItem margin="30px 0 0">1999 : les <strong>jails</strong> de FreeBSD avec des mini-systèmes dans le système (même kernel)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">2001 : Linux VServer</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">2004 : Solaris Containers</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">2005 : Open VZ</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Historique (2/2)
          </Heading>
          <List>
            <ListItem margin="60px 0 0">2006 : Process Containers (Google) -> Control Groups (cgroups) mergé dans le kernel Linux 2.6.24</ListItem>
            <Appear><ListItem margin="30px 0 0">2008 : <strong>LXC (LinuX Containers)</strong> avec les cgroups (ressources) et namespaces Linux isolés (même kernel) - voir <Code>man 7 cgroups</Code> et <Code>man 7 namespaces</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">2011 : RedHat OpenShift</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="green" bold>2013 : Docker (basé d'abord sur LXC puis format maison : libcontainer)</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Il existe aujourd'hui malgré tout des alternatives à Docker comme rkt.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Containers vs VM
          </Heading>
          <Image margin="60px 0" src={images.comparaison}></Image>
          <Text textColor="green" bold></Text>
          <Notes>
            <ul>
              <li>Les containers virtualisent l'OS, les VM virtualisent le matériel.</li>
              <li>Containers : tailles, temps de démarrage, immutables et portables.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
        <Heading size={3} textColor="tertiary" caps>
            LXC vs Docker
          </Heading>
          <Image margin="60px 0" src={images.comparaisonDocker}></Image>
          <Notes>
            <ul>
              <li>LXC = virtualisation légère, monolithes</li>
              <li>Docker = images, processus séparés</li>
              <li>Docker apporte plus que LXC (à savoir une virtualisation légère) : notion d'images et containers propres.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            CI/CD
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Légers, immutables et portables</ListItem>
            <Appear><ListItem margin="30px 0 0">Provisionner/décommissionner rapidement</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Limite les erreurs (drivers, conflits...)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Réduit les coûts entre Dev et Ops</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Élimine les restrictions (frameworks, outils...)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Automatisation complète</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="secondary" textColor="primary">
          <Image margin="0 200px" src={images.dockerLogo}></Image>
          <Notes>
            <ul>
              <li>La baleine s'appelle Moby Dock. Docker a d'ailleurs adopté une vraie baleine...</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            C'est quoi ?
          </Heading>
          <List>
            <ListItem margin="60px 0 0">SaaS/PaaS de virtualisation niveau OS</ListItem>
            <Appear><ListItem margin="30px 0 0">Crée par Solomon Hykes</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Licence Apache 2.0 (OSS) depuis 2013</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Développé en Go, v18.09.7 (27/06/2019)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Isolation et légereté</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Peut contenir de tout (Java, JavaScript, TypeScript, base de données, ...)</ListItem></Appear>
          </List>
          <Notes>
            Solomon Hykes est un franco-américain qui a créé dotCloud à Montrouge en 2008. En 2011, l'entreprise s'implante dans la Silicon Valley. En 2013, le code est ouvert.
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            C'est quoi ?
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Client <Code>docker</Code> (CLI)</ListItem>
            <Appear><ListItem margin="30px 0 0">API REST entre le client et le serveur</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>Docker Engine : dockerd</strong> pour le runtime + containerd pour les cgroups/namespaces...</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">dockerd gère des objets (images, containers, ...)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Objets stockés dans <Code>/var/lib/docker</Code></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Il existe d'autres types d'objets : networks, volumes, plugins...</li>
              <li>Sur Windows, les objets sont stockés dans "C:\Program Files\docker" (par défaut).</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Architecture
          </Heading>
          <Image margin="60px 0" src={images.dockerArchitecture}></Image>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Images
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Template en lecture seule avec instructions</ListItem>
            <Appear><ListItem margin="30px 0 0">Build once, run everywhere</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Stratégie copy-on-write</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Notion d'image de base</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Stockée localement</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>docker image COMMAND</Code></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Package/template : Le code, un environnement de runtime, les librairies, variables d'environnement, fichiers de configuration...</li>
              <li>Images stockées localement = pas perdues au reboot.</li>
              <li>Parler des images sans parent comme alpine ou ubuntu par exemple.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Docker Hub
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Registry central d'images</ListItem>
            <Appear><ListItem margin="30px 0 0">Possibilité de download/upload (tags)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">https://hub.docker.com</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Registries locaux possibles</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="red" bold>Attention aux images non officielles</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Si pas de tag spécifié c'est le latest qui est récupéré.</li>
              <li>Anecdote : Oracle a fait retirer l'image non officielle "docker-oracle-xe-11g" très utilisée sur Docker Hub en février 2019 (https://www.developpez.com/actu/246586/Oracle-supprime-une-image-Docker-approuvee-par-la-communaute-et-utilisee-lors-des-tests-sur-son-SGBD-evoquant-une-violation-de-ses-droits-d-auteur/).</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Dockerfile
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Fichier texte utilisé par <Code>docker build -t IMAGE PATH|URL</Code></ListItem>
            <Appear><ListItem margin="30px 0 0">Contexte important (<Code>PATH</Code> : chemin relatif, <Code>URL</Code> : emplacement sur un dépôt git)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Liste de commandes pour fabriquer une image : <Code>INSTRUCTION arguments</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>RUN</Code>, <Code>COPY</Code> et <Code>ADD</Code> = nouvelle couche</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Autres instructions = images intermédiaires</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Seules les couches modifiées dans un Dockerfile sont reconstruites.</li>
              <li>docker build = docker image build</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Dockerfile
          </Heading>
          <List>
            <ListItem margin="60px 0 0"><Code>FROM image[:tag] [AS name]</Code> <strong>(obligatoire)</strong> pour indiquer l'image de base (première instruction)</ListItem>
            <Appear><ListItem margin="30px 0 0"><Code>COPY</Code> pour copier des fichiers</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>ADD</Code> pour copier des fichiers (URL autorisées, archives également = dézippées)</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Si l'image dans le FROM n'existe pas localement, elle est téléchargée depuis Docker Hub.</li>
              <li>Le nom de l'image peut servir pour le multi-stage (avec COPY --from=name par exemple).</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Dockerfile
          </Heading>
          <List>
            <Appear><ListItem margin="60px 0 0"><Code>RUN</Code> pour exécuter une commande (commit dans une nouvelle image temporaire)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>CMD</Code> ou <Code>ENTRYPOINT</Code> <strong>(obligatoire)</strong> pour définir une commande à exécuter au lancement du container</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Il existe d'autres instructions : MAINTENER, LABEL (métadonnées clé/valeur), EXPOSE (ports), VOLUME (monter un volume depuis l'hôte), USER (pour spécifier un utilisateur, sinon root par défaut), WORKDIR, ENV (variables d'environnement), ARG (variables d'environnement uniquement pour l'image, seule instruction qui peut précéder FROM), ONBUILD (pour exécuter une commande si l'image en cours sert d'image de base), SHELL...</li>
              <li>Différences entre CMD et ENTRYPOINT = si commande à la fin d'un docker run CMD l'exécute à la place de la commande CMD, pas ENTRYPOINT.</li>
              <li>Les couches d'images s'empilent.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Dockerfile
          </Heading>
          <Image margin="60px 275px" src={images.dockerfile}></Image>
          <List>
            <ListItem margin="30px 0 0">Récupère une image de base "alpine" (5 Mo)</ListItem>
            <Appear><ListItem margin="30px 0 0">Copie un projet (hôte) dans /app (container)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Lance une compilation maven</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Définit la commande d'entrée du container</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              Possibilité de remplacer le cd /app dans le RUN par une instruction WORKDIR /app
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Bonnes pratiques
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Comprendre le <strong>contexte</strong></ListItem>
            <Appear><ListItem margin="30px 0 0">Utiliser un <strong>.dockerignore</strong></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Utiliser le build <strong>multi-stage</strong></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Minimiser le <strong>nombre de couches</strong></ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Bonnes pratiques
          </Heading>
          <List>
            <Appear><ListItem margin="60px 0 0">Exploiter le <strong>cache</strong></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Construire une image avec stdin</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Meilleur support <strong>à partir de Java 10</strong> : https://blog.docker.com/2018/04/improved-docker-container-integration-with-java-10/</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>L'entrée standard peut servir d'entrée au docker build dans certains cas (notamment si pas de copie de fichiers) : plus rapide qu'avec un Dockerfile en dur.</li>
              <li>Pour chaque instruction examinée, Docker examine son cache pour chercher une image intermédiaire qui n'existerait pas déjà.</li>
              <li>En complément : instruction RUN multi-ligne avec \, penser à update et install dans le même RUN.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Containers
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Instance d'une image (runtime)</ListItem>
            <Appear><ListItem margin="30px 0 0">Analogie avec classe/objet en POO</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Partage le noyau de la machine hôte</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Lister les containers lancés : <Code>docker ps</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Lancer un container en interactif : <Code>docker container run -it IMAGE</Code></ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Docker Compose
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Fichier YAML pour définir, lancer et scaler des <strong>services</strong></ListItem>
            <Appear><ListItem margin="30px 0 0">Comportement des containers en prod</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Gestion des <strong>ressources</strong> (CPU, RAM)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Pull d'autres images (BDD par exemple)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Ex : <Code>docker-compose -f sonar.yml up</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="green" bold>Utile pour les microservices</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Multi-stage
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Build en plusieurs étapes</ListItem>
            <Appear><ListItem margin="30px 0 0">Plusieurs instructions <Code>FROM</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Le dernier <Code>FROM</Code> définit la dernière image et donc celle qui portera le tag</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Réduit la taille de l'image finale</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="green" bold>Utile pour compiler le code dans une image intermédiaire par exemple</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Les images intermédiaires sont supprimées.</li>
              <li>La dernière image est en générale légère.</li>
              <li>Parler du cas du fichier .lpx sur METRO pour la mise en place du multi-stage.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            #DevSecOps
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Images de base minimales (alpine)</ListItem>
            <Appear><ListItem margin="30px 0 0">Utilisateur le moins privilégié (<Code>USER</Code>)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Vérifier/signer les images (/!\ MIDM)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Trouver/corriger les vulnérabilités (Snyk)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Pas d'infos sensibles dans le Dockerfile</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Par exemple image "node" a près de 600 vulnérabilités connues. L'image "ubuntu" en a 30.</li>
              <li>L'utilisateur par défaut dans le container est root. Possibilité de l'être sur le système hôte. Ajouter un user avec RUN groupadd puis le définir avec USER.</li>
              <li>MIDM = man in the middle</li>
              <li>Possibilité de le faire avec export DOCKER_CONTENT_TRUST=1</li>
              <li>Les clés privées ou tokens doivent être gardées à l'extérieur d'une image (et d'un Dockerfile). Ou bien utiliser le multi-stage pour faire porter ces infos à une image intermédiaire qui sera détruite. Utiliser le .dockerignore notamment pour les COPY.</li>
              <li>Signer les images avec Notary.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            #DevSecOps
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Utiliser des tags fixes et élevés (pas latest)</ListItem>
            <Appear><ListItem margin="30px 0 0">Utiliser <Code>COPY</Code> plutôt que <Code>ADD</Code> (risques : URL distantes, archives corrompues)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Ajouter des métadonnées (<Code>LABEL</Code>)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Utiliser le multi-stage</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Utiliser un linter (hadolint)</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Des images peuvent être republiées sur un même tag (par exemple latest) et donc l'image de base peut changer entre ces builds.</li>
              <li>Le multi-stage build crée des images petites et sécurisées, réduisant la surface d'attaque.</li>
              <li>Il y a même une extension VS Code pour hadolint (https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint).</li>
              <li>Possibilité d'utiliser aussi "docker inspect OBJECT" pour avoir des infos sur un objet donné.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Et sur Windows ?
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Docker Desktop for Windows ou Docker Toolbox avec PowerShell ou cmd ou Cmder</ListItem>
            <Appear><ListItem margin="30px 0 0">Compatibilité avec Hyper-V</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Mêmes commandes que sur Linux</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="green" bold>Windows Subsystem for Linux 2 (WSL) (Windows 10, preview juillet 2019)</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Docker Swarm
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Outil standalone de clustering pour orchestrer les containers dans un <strong>swarm</strong></ListItem>
            <Appear><ListItem margin="30px 0 0">Scalabilité : plusieurs machines physiques/virtuelles (et donc 1 dockerd / machine = <strong>node</strong>)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Nodes <strong>managers</strong> et <strong>workers</strong></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Load balancing : <Code>docker swarm init</Code> et <Code>docker stack deploy...</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Se base sur les fichiers <strong>Docker Compose</strong></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Un swarm est un cluster dockerizé.</li>
              <li>Le manager peut autoriser l'ajout d'autres machines (workers).</li>
              <li>Possibilité de passer Docker en swarm mode sur la machine locale qui devient le swarm manager.</li>
              <li>docker swarm init sur le swarm manager puis docker swarm join sur les machines workers.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['zoom']} bgColor="secondary" textColor="primary">
          <Image margin="0 200px" src={images.k8sLogo} height="500px"></Image>
          <Notes>
            <ul>
              <li>Le nom de code original de Kubernetes chez Google était "Project Seven of Nine", et accessoirement une référence à un personnage de Star Trek qui est un Borg amical. Les 7 branches de la roue du logo sont une référence à ce nom de code.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            C'est quoi ?
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Système d'orchestration de containers</ListItem>
            <Appear><ListItem margin="30px 0 0">Crée par Google</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Licence Apache 2.0 (OSS) depuis 2014</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Développé en Go, v1.15 (19/06/2019)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">κυβερνήτης en grec = capitaine</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">k8s</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Architecture
          </Heading>
          <Image margin="30px 50px" src={images.k8sArchitecture}></Image>
          <Notes>
            <ul>
              <li>C'est important de bien comprendre les objets de k8s</li>
              <li>Master et workers sont des nodes</li>
              <li>Les requêtes arrivent sur les proxies</li>
              <li>kubectl et Web UI (dashboard) interrogent API Server</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Installation
          </Heading>
          <List>
            <ListItem margin="60px 0 0">dockerd doit tourner</ListItem>
            <Appear><ListItem margin="30px 0 0"><strong>kubeadm</strong> : pour créer un cluster</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>kubelet</strong> : pour démarrer pods et containers</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>kubectl</strong> : pour parler au cluster</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#installing-kubeadm-kubelet-and-kubectl</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            kubectl
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Configuration en lignes de commandes</ListItem>
            <Appear><ListItem margin="30px 0 0">Gérer les objets d'un cluster</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Déployer des applications, voir les logs...</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl [cmd] [TYPE] [NAME] [flags]</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">https://kubernetes.io/docs/tasks/tools/install-kubectl/</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Clusters
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Ensemble de nodes</ListItem>
            <Appear><ListItem margin="30px 0 0">Gestion avec <Code>kubectl</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Manipulation d'objets</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Pas plus de 5000 nodes par cluster. Pas plus de 150000 pods. Pas plus de 300000 containers. Pas plus de 100 pods par noeud.</li>
              <li>Questions à se poser : quel objet veux-je manipuler ? quelle action veux-je réaliser ?</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Master
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Noeud particulier, maître</ListItem>
            <Appear><ListItem margin="30px 0 0">Contrôle les workers (<strong>controller manager + scheduler</strong>)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Contient l'<strong>API server</strong> (<Code>kubectl</Code>, web UI)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>etcd</strong> : data store persistent, distribué et léger pour la configuration clé/valeur du cluster</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Le kube-scheduler affecte les pods sans noeud à des noeuds.</li>
              <li>etcd est proche de Apache ZooKeeper. Respecte le théorème CAP en privilégiant la cohérence (consistency) sur la disponibilité (availability). Ce qui est important pour assurer le scheduling.</li>
              <li>Théorème CAP : dans un système distribué il est impossible de garantir en même temps cohérence (tous les noeuds voient les mêmes données au même moment), disponibilité (garantie que toutes les requêtes reçoivent une réponse) et tolérance au partionnement (aucune panne moins importante qu'une coupure totale du réseau ne doit empêcher le système de répondre correctement).</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Nodes
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Workers (minions) : exécutent les tâches</ListItem>
            <Appear><ListItem margin="30px 0 0">Machine physique ou virtuelle</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>Container runtime</strong> : lance les containers</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>kubelets</strong> : s'assure que les containers tournent dans un pod</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><strong>kube-proxy</strong> : implémente une IP virtuelle pour les services</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Pods
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Objet REST top-level</ListItem>
            <Appear><ListItem margin="30px 0 0">1 ou n containers (Docker, rktlet...)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Réseau et stockage partagé</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Relancé avec nouvelle IP à la destruction</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl get|delete|describe... pod(s) NAME [ARGS]</Code></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>1 container par pod ou n containers si besoin de partager des ressources.</li>
              <li>Ajoute une couche d'abstraction réseau/partagé. Même IP, hostname, ressources...</li>
              <li>Chaque pod possède une adresse IP unique.</li>
              <li>Par défaut la restartPolicy est "Always".</li>
              <li>Les phases des pods statuses peuvent avoir différentes valeurs : Pending, Running, Succeeded, Failed et Unknown.</li>
              <li>Un pod peut contenir des init containers qui s'exécutent en premier.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Services
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Objet REST</ListItem>
            <Appear><ListItem margin="30px 0 0">Abstraction réseau de 1 ou n pod(s)</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Différent d'un service de Docker Compose</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Deployment = replicas, continuous delivery...</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Un service est une abstraction qui définit l'accès à un pod ou à un ensemble de pods.</li>
              <li>Le contrôleur pour le sélecteur de services va scanner en continu les pods qui correspondent à ce sélecteur et envoyer en POST les mises à jour au endpoint du service. Possibilité de service sans sélecteur dans certains cas (par exemple : cluster de bdd externe en production).</li>
              <li>Différent d'un service de Docker Compose (ensemble de conteneurs identiques), dans Kubernetes c'est un mécanisme permettant d’accéder à des ressources (par exemple des conteneurs) dont l’adresse réseau n’est pas fixe.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Configuration YAML
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Définition d'un objet k8s (manifeste)</ListItem>
            <Appear><ListItem margin="30px 0 0">Ajout de complexité possible</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Contrôle des sources</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Validation sur https://kubeyaml.com/</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl apply|create|delete|replace -f obj.yaml</Code></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Pas besoin de longues commandes</li>
              <li>kubectl convertit l'information contenue dans le YAML en JSON pour faire appel à l'API server</li>
              <li>Possibilité aussi d'écrire des fichiers JSON</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Minikube
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Créer un cluster single-node en local</ListItem>
            <Appear><ListItem margin="30px 0 0">Commande <Code>minikube [cmd]</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Load balancing, dashboard, ...</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Alternative single-node : MicroK8s</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Alternatives multi-nodes : Kind, Dind...</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0" textColor="red" bold>Nécessite un hyperviseur</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Solution on premise et cluster unique comme ses alternatives</li>
              <li>Alternative pour tester du multi clusters en local : passer par des Raspberry Pi (ça tombe bien le 4 vient de sortir) !</li>
              <li>Hyperviseurs possibles : KVM, VirtualBox...</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Cloud
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Google Kubernetes Engine (<strong>GKE</strong>) avec la commande <Code>gcloud</Code> : https://cloud.google.com/kubernetes-engine</ListItem>
            <Appear><ListItem margin="30px 0 0">Amazon Elastic container service for KuberneteS (<strong>EKS</strong>) : https://aws.amazon.com/fr/eks</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Azure Kubernetes Service (<strong>AKS</strong>) : https://docs.microsoft.com/en-us/azure/aks</ListItem></Appear>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Web UI (Dashboard)
          </Heading>
          <Image margin="30px 0" src={images.webui}></Image>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Helm
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Gestionnaire de packages</ListItem>
            <Appear><ListItem margin="30px 0 0">Maintenu par la CNCF</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Basé sur le <Code>Chart.yaml</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">https://helm.sh/docs/</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>CNCF = Cloud native computing foundation</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Commandes utiles
          </Heading>
          <List>
            <ListItem margin="60px 0 0"><Code>kubectl logs POD</Code></ListItem>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl exec -it POD -- CMD</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl cp POD:/path/to/remote/file /path/to/local/file</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl help [CMD]</Code></ListItem></Appear>
            <Appear><ListItem margin="30px 0 0"><Code>kubectl explain [OBJ]</Code></ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>CNCF = Cloud native computing foundation</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['zoom']} bgColor="secondary" textColor="primary">
          <Heading size={1}>Démo !</Heading>
          <Image margin="75px 200px 0" src={images.jenkinsXLogo}></Image>
          <Text margin="75px 0 0" textColor="primary" textSize="24">
          https://github.com/fdelbrayelle/midi-tech-k8s/tree/master/demo
          </Text>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            En complément
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Service mesh (Istio)</ListItem>
            <Appear><ListItem margin="30px 0 0">Jenkins X mieux adapté</ListItem></Appear>
            <Appear><ListItem margin="30px 0 0">Écosystème complexe et vaste</ListItem></Appear>
          </List>
          <Notes>
            <ul>
              <li>Istio permet de contrôler les flux entre les services, de faire du blue/green deployment, etc.</li>
            </ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Et le turfu ?
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Serverless</ListItem>
            <Appear><ListItem margin="30px 0 0">LinuxKit</ListItem></Appear>
          </List>
          <Notes>
            <ul>LinuxKit permet de construire des distributions Linux minimales et immutables : bâti sur des containers, pour lancer des containers.</ul>
          </Notes>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Liens utiles
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Docker : https://docs.docker.com/get-started</ListItem>
            <ListItem margin="30px 0 0">K8s : https://kubernetes.io/docs/concepts</ListItem>
            <ListItem margin="30px 0 0">DevFest Lille 2019 : https://www.youtube.com/user/francegdg</ListItem>
            <ListItem margin="30px 0 0">https://dzone.com/articles/docker-layers-explained</ListItem>
            <ListItem margin="30px 0 0">https://dzone.com/refcardz/cicd-with-containers</ListItem>
          </List>
        </Slide>
        <Slide transition={['fade']} bgColor="primary" textColor="secondary">
          <Heading size={3} textColor="tertiary" caps>
            Sur Windows
          </Heading>
          <List>
            <ListItem margin="60px 0 0">Docker Windows Containers : https://www.docker.com/products/windows-containers</ListItem>
            <ListItem margin="30px 0 0">Docker for Windows : https://docs.docker.com/docker-for-windows/</ListItem>
            <ListItem margin="30px 0 0">Docker for WSL 2 : https://engineering.docker.com/2019/06/docker-hearts-wsl-2/</ListItem>
          </List>
        </Slide>
        <Slide transition={['zoom']} bgColor="secondary" textColor="primary">
          <Heading size={1}>Merci !</Heading>
          <Image margin="75px 200px 0" src={images.jenkinsXLogo}></Image>
          <Text margin="75px 0 0" textColor="primary" textSize="24">
          https://github.com/fdelbrayelle/midi-tech-k8s
          </Text>
          <Notes>
            Faire un ROTI (de 0 à 5) !
          </Notes>
        </Slide>
      </Deck>
    );
  }
}
