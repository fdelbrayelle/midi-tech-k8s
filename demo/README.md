# Midi technique - Kubernetes (démo)

Ce dossier contient la démo effectuée pour le midi technique :
- Un back en Spring Boot exposant une API REST pour gérer des bières avec uniquement deux routes : une pour lister les bières (GET /beers) et une pour ajouter une bière (POST /beers). Le CORS est géré dans le BeerController.
- Un front en Angular pour afficher simplement les bières.
- Un dossier k8s contenant deux fichiers YAML pour les déploiements de chacune de ces parties dans Kubernetes.
