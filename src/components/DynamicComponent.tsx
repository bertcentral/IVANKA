- [Fonctionnalités](#fonctionnalités)
- [Architecture du projet](#architecture-du-projet)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation et déploiement](#installation-et-déploiement)
- [Configuration](#configuration)
- [Structure du répertoire](#structure-du-répertoire)
- [CI/CD](#cicd)
- [Tests](#tests)
- [Contribuer](#contribuer)
- [Licence](#licence)
- [Contact](#contact)

## Fonctionnalités

- **Backend** : Application Flask utilisant Gunicorn pour la production, sécurisée avec JWT et le hashage de mots de passe (bcrypt ou argon2).
- **Endpoints RESTful** pour l'authentification (/auth/login, /auth/refresh), la gestion de contenu (/content/update) et le monitoring (/status/metrics).
- **Monitoring système** : Intégration de psutil pour la collecte de métriques système en temps réel.
- **Frontend** : Application React servie via NGINX, avec une interface moderne stylisée avec TailwindCSS et Dark Mode natif.
- **Infrastructure** : Orchestration via Docker Compose, avec réseaux privés et dépendances entre services.
- **CI/CD** : Pipeline automatisée avec GitHub Actions pour le linting, les tests, la construction des images Docker et le déploiement.
- **Sécurité avancée** : Configuration CORS, Rate Limiting, headers sécurisés via Flask-Talisman et gestion des tokens JWT avec refresh tokens.
- **Mode Offline** : Progressive Web App (PWA) avec service workers pour une utilisation hors-ligne.
- **Monitoring visuel** : Intégration de Grafana et Prometheus pour la visualisation des métriques du backend.

## Architecture du projet

Le projet est divisé en plusieurs parties :

1. **Backend** : Développé en Flask, il gère l'authentification, la gestion du contenu et la surveillance des métriques. Gunicorn est utilisé pour le scaling en production.
2. **Frontend** : Développé en React et compilé avec des outils modernes, il est servi par NGINX pour de meilleures performances.
3. **Infrastructure** : Orchestration des différents services (backend, frontend, Prometheus, Grafana) via Docker Compose.
4. **CI/CD** : Pipeline GitHub Actions pour automatiser les tests, le build et le déploiement.

## Technologies utilisées

- **Backend** : Python, Flask, SQLAlchemy, Flask-JWT-Extended, Gunicorn, psutil
- **Frontend** : React, NGINX, TailwindCSS
- **Infrastructure** : Docker, Docker Compose
- **Monitoring** : Prometheus, Grafana
- **CI/CD** : GitHub Actions
- **Tests** : pytest (backend), eslint (frontend)

## Prérequis

- Docker et Docker Compose installés sur votre machine.
- Python 3.9 ou supérieur.
- Node.js (pour le développement du frontend).

## Installation et déploiement

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/ton-utilisateur/ton-depot.git
   cd ton-depot