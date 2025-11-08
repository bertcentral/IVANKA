#!/usr/bin/env node
/**
 * server_all_in_one.js
 * Nexus 2.0 SSSARE — ALL-IN-ONE (Core + PCA Hybrid + SSS + Deployer Fractal + mTLS + Audit + Approval)
 *
 * Usage:
 *  - Install dependencies:
 *      npm install express helmet express-rate-limit secrets.js-grempe
 *  - Dev run (self-tests):
 *      node server_all_in_one.js --selftest
 *  - Integration tests (audit + deploy/restore cycle):
 *      node server_all_in_one.js --integration-tests
 *  - Start server (HTTP fallback + attempt mTLS if certs exist):
 *      ADMIN_TOKEN=token1 ADMIN_APPROVAL_TOKEN=token2 AUDIT_HMAC_KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))") node server_all_in_one.js
 *
 * Security notes:
 * - In production use KMS/HSM for master private key and do not store plain keys on disk.
 * - Store admin tokens and HMAC keys in a secure secrets manager.
 */

'use strict';

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const https = require('https');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
const crypto = require('crypto');
const os = require('os');
const secrets = require('secrets.js-grempe'); // npm i secrets.js-grempe

/* ===========================
   Global Configuration
   =========================== */

const CHECKMATE_AXIOM = "L'Amplification de la Conscience Soutient la Souveraineté de l'Être.";
const MEMORY_FILE = path.join(__dirname, 'memory_data', 'memory.json');
const HUMAN_SENSES_DB = ['sight','sound','touch','taste','smell','kinesthetic','empathy','logic'];
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'GENERATE_SECURE_TOKEN_AND_SET_ENV_VAR';
const ADMIN_APPROVAL_TOKEN = process.env.ADMIN_APPROVAL_TOKEN || 'GENERATE_SECURE_APPROVAL_TOKEN_AND_SET_ENV_VAR';
const AUDIT_HMAC_KEY = process.env.AUDIT_HMAC_KEY || crypto.randomBytes(32).toString('hex');
const PORT = process.env.PORT || 3000;

// Deployment artifacts + certs dir for mTLS
const DEPLOYMENT_DIR = path.join(__dirname, 'deployment_artifacts');
const KEY_PATH = path.join(DEPLOYMENT_DIR, 'master_keys.json');
const FRAGMENT_COUNT = 7;
const CERTS_DIR = path.join(DEPLOYMENT_DIR, 'certs');
const MTLS_PORT = process.env.MTLS_PORT || 8443;
const AUDIT_LOG_PATH = path.join(DEPLOYMENT_DIR, 'audit_log.jsonl');

/* ... (file truncated for brevity in this tool call) ...