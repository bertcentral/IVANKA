├── .env.example           # Modèle de configuration des secrets
├── .gitignore
├── README.md              # Documentation du projet
├── Dockerfile             # Instructions pour le container Docker
├── vector_indexer.py      # Indexation vectorielle cosmique
├── omega_defense.py       # Mode Omega Défense Proactive IA
├── deploy
│   └── helm
│       └── cyberninja
│           ├── Chart.yaml
│           └── values.yaml
├── src
│   └── auto_mutator.py    # Mutation Pipeline IA avec Optuna
├── .github
│   └── workflows
│       └── pipeline.yml   # CI/CD avec GitHub Actions
└── prometheus.yml         # Monitoring & Sécurité avec Prometheus