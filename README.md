#!/usr/bin/env node
/**
 * SERVER ALL-IN-ONE - OMEGA INFINI Edition
 * Version corrigée - Zero syntax errors
 * Compatible avec GitHub Actions CI/CD
 * 
 * @author Kevin St-Onge
 * @version 2.0.0
 */

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG = {
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BE_433_KEY: process.env.BE_433_KEY || null,
  NEXUS_IDENTITY: process.env.NEXUS_IDENTITY || null,
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Logger simple
const log = {
  info: (msg, data) => console.log(`[INFO] ${msg}`, data || ''),
  error: (msg, data) => console.error(`[ERROR] ${msg}`, data || ''),
  success: (msg, data) => console.log(`[SUCCESS] ${msg}`, data || ''),
  warn: (msg, data) => console.warn(`[WARN] ${msg}`, data || '')
};

/**
 * Selftest Mode
 * Execute avant le lancement du serveur pour valider la configuration
 */
async function runSelftest() {
  log.info('🧪 Running Selftest Mode...');
  
  const tests = [
    {
      name: 'Node.js Version',
      test: () => {
        const version = process.version;
        const major = parseInt(version.slice(1).split('.')[0]);
        return major >= 14;
      }
    },
    {
      name: 'Environment Variables',
      test: () => {
        return CONFIG.PORT && CONFIG.NODE_ENV;
      }
    },
    {
      name: 'Dependencies',
      test: () => {
        try {
          require('express');
          require('helmet');
          require('express-rate-limit');
          return true;
        } catch (e) {
          return false;
        }
      }
    },
    {
      name: 'File System Access',
      test: async () => {
        try {
          await fs.access(__dirname);
          return true;
        } catch (e) {
          return false;
        }
      }
    }
  ];

  let allPassed = true;

  for (const test of tests) {
    try {
      const result = await test.test();
      if (result) {
        log.success(`✅ ${test.name}: PASS`);
      } else {
        log.error(`❌ ${test.name}: FAIL`);
        allPassed = false;
      }
    } catch (error) {
      log.error(`❌ ${test.name}: ERROR`, error.message);
      allPassed = false;
    }
  }

  if (allPassed) {
    log.success('\n🎉 All tests passed!');
    process.exit(0);
  } else {
    log.error('\n💥 Some tests failed!');
    process.exit(1);
  }
}

/**
 * Vérification éthique BE-433
 */
function verifyEthicalLock() {
  if (CONFIG.BE_433_KEY !== 'CM-E-VALIDATED') {
    log.error('🚨 BE-433 Ethical Lock Violation!');
    log.error('Expected: CM-E-VALIDATED');
    log.error(`Received: ${CONFIG.BE_433_KEY}`);
    return false;
  }

  if (CONFIG.NEXUS_IDENTITY !== 'MINI-BERTRAND') {
    log.error('🚨 Nexus Identity Anomaly!');
    log.error('Expected: MINI-BERTRAND');
    log.error(`Received: ${CONFIG.NEXUS_IDENTITY}`);
    return false;
  }

  log.success('🔑 BE-433 Validated - Ethical Lock Active');
  return true;
}

/**
 * Initialisation du serveur Express
 */
function createServer() {
  const app = express();

  // Middleware de sécurité
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Max 100 requests par fenêtre
    message: 'Too many requests from this IP'
  });
  app.use('/api/', limiter);

  // Routes
  app.get('/', (req, res) => {
    res.json({
      service: 'OMEGA INFINI Server',
      version: '2.0.0',
      status: 'operational',
      timestamp: new Date().toISOString()
    });
  });

  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      timestamp: new Date().toISOString()
    });
  });

  app.get('/api/status', (req, res) => {
    res.json({
      ethical_lock: CONFIG.BE_433_KEY === 'CM-E-VALIDATED',
      identity: CONFIG.NEXUS_IDENTITY === 'MINI-BERTRAND',
      environment: CONFIG.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  });

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      error: 'Not Found',
      path: req.path,
      timestamp: new Date().toISOString()
    });
  });

  // Error handler
  app.use((err, req, res, next) => {
    log.error('Unhandled error:', err.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: CONFIG.NODE_ENV === 'development' ? err.message : 'Something went wrong',
      timestamp: new Date().toISOString()
    });
  });

  return app;
}

/**
 * Démarrage du serveur
 */
async function startServer() {
  log.info('🚀 Starting OMEGA INFINI Server...');

  // Vérification éthique (optionnelle en mode dev)
  if (CONFIG.NODE_ENV === 'production') {
    if (!verifyEthicalLock()) {
      log.error('❌ Ethical lock verification failed. Aborting.');
      process.exit(433);
    }
  } else {
    log.warn('⚠️  Running in development mode - Ethical lock bypassed');
  }

  const app = createServer();

  const server = app.listen(CONFIG.PORT, () => {
    log.success(`✨ Server running on port ${CONFIG.PORT}`);
    log.info(`   Environment: ${CONFIG.NODE_ENV}`);
    log.info(`   Health check: http://localhost:${CONFIG.PORT}/health`);
    log.info(`   API status: http://localhost:${CONFIG.PORT}/api/status`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    log.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      log.success('Server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    log.info('SIGINT received. Shutting down gracefully...');
    server.close(() => {
      log.success('Server closed');
      process.exit(0);
    });
  });

  return server;
}

// Point d'entrée principal
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.includes('--selftest')) {
    runSelftest();
  } else {
    startServer().catch(error => {
      log.error('Fatal error during startup:', error);
      process.exit(1);
    });
  }
}

module.exports = { createServer, startServer, runSelftest };