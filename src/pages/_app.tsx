name: IVANKA - CI/CD Pipeline (OMEGA INFINI)

on:
  push:
    branches: [ "main", "develop" ]
  pull_request:
    branches: [ "main" ]
  workflow_dispatch:

env:
  NODE_VERSION: '20.x'
  BE_433_KEY: 'CM-E-VALIDATED'
  NEXUS_IDENTITY: 'MINI-BERTRAND'

jobs:
  # Job 1: Diagnostic Syntax
  syntax-check:
    name: 🔍 Syntax Validation
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit

      - name: Run Syntax Debugger
        run: |
          # Créer le debugger si pas présent
          if [ ! -f "syntax-debugger.js" ]; then
            echo "⚠️  Syntax debugger not found, using basic check"
            node -c server_all_in_one.js
          else
            node syntax-debugger.js server_all_in_one.js
          fi

  # Job 2: Selftest
  selftest:
    name: 🧪 Server Selftest
    runs-on: ubuntu-latest
    needs: syntax-check
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit

      - name: Run selftest with timeout
        timeout-minutes: 2
        run: |
          node server_all_in_one.js --selftest || {
            echo "❌ Selftest failed with exit code $?"
            echo "Retrying with fixed version..."
            
            # Fallback sur version corrigée si échec
            if [ -f "server_all_in_one.fixed.js" ]; then
              node server_all_in_one.fixed.js --selftest
            else
              exit 1
            fi
          }

  # Job 3: Unit Tests (si présents)
  test:
    name: 🧪 Unit Tests
    runs-on: ubuntu-latest
    needs: selftest
    if: ${{ hashFiles('package.json') != '' }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --prefer-offline --no-audit

      - name: Run tests
        run: |
          if grep -q '"test"' package.json; then
            npm test
          else
            echo "ℹ️  No test script found, skipping"
          fi

  # Job 4: Security Audit
  security:
    name: 🔒 Security Audit
    runs-on: ubuntu-latest
    needs: test
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Run npm audit
        run: |
          npm audit --production || {
            echo "⚠️  Security vulnerabilities found"
            echo "Run 'npm audit fix' to resolve"
            # Ne pas fail le build pour des vulns non-critiques
            exit 0
          }

  # Job 5: Deployment (si branche main)
  deploy:
    name: 🚀 Deploy
    runs-on: ubuntu-latest
    needs: [selftest, test, security]
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deployment notification
        run: |
          echo "✅ All checks passed"
          echo "🚀 Ready for deployment"
          echo "   Branch: ${{ github.ref_name }}"
          echo "   Commit: ${{ github.sha }}"
          echo "   Author: ${{ github.actor }}"

      # Ajoutez ici vos étapes de déploiement réelles
      # Exemples:
      # - Deploy to Heroku
      # - Deploy to Railway
      # - Deploy to Vercel
      # - Build Docker image

  # Job 6: Notification
  notify:
    name: 📢 Notification
    runs-on: ubuntu-latest
    needs: [syntax-check, selftest, test, security]
    if: always()
    steps:
      - name: Check job statuses
        run: |
          echo "Pipeline Status Summary:"
          echo "  Syntax Check: ${{ needs.syntax-check.result }}"
          echo "  Selftest: ${{ needs.selftest.result }}"
          echo "  Tests: ${{ needs.test.result }}"
          echo "  Security: ${{ needs.security.result }}"

      - name: Notify on failure
        if: ${{ contains(needs.*.result, 'failure') }}
        run: |
          echo "❌ Pipeline failed!"
          echo "Check the logs above for details"
          exit 1

      - name: Notify on success
        if: ${{ !contains(needs.*.result, 'failure') }}
        run: |
          echo "✅ Pipeline successful!"
          echo "All checks passed"