#!/usr/bin/env node
const { syncEnv } = require('../src/index');
const yargs = require('yargs');

const argv = yargs
  .option('env', { type: 'string', default: 'dev', describe: 'Nom de l\'environnement' })
  .option('envPath', { type: 'string', default: '.env', describe: 'Fichier .env cible' })
  .argv;

syncEnv({
  env: argv.env,
  envPath: argv.envPath,
}).then(({ added }) => {
  console.log(`✅ Ajouté ${added} nouvelle(s) variable(s) depuis Infisical`);
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(1);
});
