.gitignore # Node.js node_modules/ npm-debug.log yarn-error.log .DS_Store # Logs logs/ *.log # Éditeur et IDE .vscode/ .idea/ *.iml # Systèmes temporaires *.swp *.swo # Fichiers compilés et binaires *.exe *.dll *.so *.dylib *.o *.obj # Mono / .NET / C# *.csproj *.sln bin/ obj/ *.pdb README.md # CyberNinja 71+ Omniversal Deployment Architecture ## Description CyberNinja 71+ est une architecture avancée pour le déploiement omniversal d'intelligences artificielles. Elle intègre : - **Vectorisation Sémantique Cosmique** avec Qdrant & Sentence Transformers. - **Orchestration Multi-Réalité K8s** via Helm. - **Mutation Pipeline IA** avec Optuna. - **CI/CD** via GitHub Actions. - **Monitoring & Sécurité** avec Prometheus. - **Mode Omega Défense Proactive IA** (watchdog, backups automatiques, monitoring avancé). ## Installation & Déploiement ```bash git clone https://github.com/bertcentral/CyberNinja-71-Omniversal.git cd CyberNinja-71-Omniversal Prérequis Node.js et npm Docker Kubernetes (kubectl & Helm) Python 3 avec pip Lancer l'Application npm install npm start 

Accédez à l'application sur http://localhost:3000.

Contribuer Forker le projet. Créer une branche : git checkout -b feature/ma-feature. Committer : git commit -m "Ajout d'une nouvelle fonctionnalité". Pousser : git push origin feature/ma-feature. Ouvrir une pull request. CI/CD avec GitHub Actions 

Un workflow CI/CD est configuré pour :

Vérifier le code (linting, tests unitaires) Construire et pousser l'image Docker Déployer sur Kubernetes via Helm 

Fichier .github/workflows/deploy.yml :

name: CI/CD Pipeline on: push: branches: - main pull_request: branches: - main jobs: build-and-push: runs-on: ubuntu-latest steps: - name: Checkout repository uses: actions/checkout@v3 - name: Set up Docker Buildx uses: docker/setup-buildx-action@v2 - name: Login to Docker Hub uses: docker/login-action@v2 with: username: ${{ secrets.DOCKER_USERNAME }} password: ${{ secrets.DOCKER_PASSWORD }} - name: Build and push Docker image uses: docker/build-push-action@v3 with: push: true tags: bertcentral/cyberninja71:latest deploy: needs: build-and-push runs-on: ubuntu-latest steps: - name: Checkout repository uses: actions/checkout@v3 - name: Setup kubectl uses: azure/setup-kubectl@v3 - name: Deploy to Kubernetes run: | kubectl apply -f k8s/ Licence 

MIT License.

