// src/index.js
require('dotenv').config();
const { InfisicalSDK } = require('@infisical/sdk');
const fs = require('fs');

const getClient = (() => {
  let clientInstance = null;
  return async (config = {}) => {
    if (clientInstance) return clientInstance;
    const sdk = new InfisicalSDK({ siteUrl: config.siteUrl || process.env.SITE_URL });
    await sdk.auth().universalAuth.login({
      clientId: config.clientId || process.env.CLIENT_ID,
      clientSecret: config.clientSecret || process.env.CLIENT_SECRET,
    });
    clientInstance = sdk;
    return clientInstance;
  };
})();

const getEnvVariables = async (env, config = {}) => {
  const client = await getClient(config);
  const { secrets } = await client.secrets().listSecrets({
    environment: env,
    projectId: config.projectId || process.env.PROJECT_ID,
    secretPath: '/',
  });
  return secrets.map(({ secretKey, secretValue }) => ({ secretKey, secretValue }));
};

const syncEnv = async ({
  env = 'dev',
  envPath = '.env',
  config = {},
} = {}) => {
  const envVars = await getEnvVariables(env, config);
  let envLines = [];
  let existingVars = {};
  if (fs.existsSync(envPath)) {
    envLines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    envLines.forEach(line => {
      const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
      if (match) {
        existingVars[match[1]] = match[2];
      }
    });
  }
  let newVars = envVars.filter(v => !(v.secretKey in existingVars));
  if (newVars.length > 0) {
    newVars = newVars.sort((a, b) => a.secretKey.localeCompare(b.secretKey));
    if (envLines.length > 0 && envLines[envLines.length - 1].trim() !== '') envLines.push('');
    newVars.forEach(v => {
      envLines.push(`${v.secretKey}="${String(v.secretValue).replace(/\r?\n|\r/g, ' ')}"`);
    });
  }
  fs.writeFileSync(envPath, envLines.join('\n'));
  return { added: newVars.length };
};

module.exports = { syncEnv };
