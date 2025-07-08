#!/usr/bin/env node
const { syncEnv, smartSync, isNextProject } = require('../src/index');
const yargs = require('yargs');

const argv = yargs
  .option('env', { 
    type: 'string', 
    default: 'dev', 
    describe: 'Environnement Infisical (dev, production, staging, etc.)' 
  })
  .option('envPath', { 
    type: 'string', 
    describe: 'Fichier .env cible (auto-détecté si non spécifié)' 
  })
  .option('smart', {
    type: 'boolean',
    default: true,
    describe: 'Détection automatique du type de projet (Next.js, etc.)'
  })
  .example('$0', 'Synchronise avec détection automatique')
  .example('$0 --env production', 'Synchronise l\'environnement production')
  .example('$0 --envPath .env.local', 'Synchronise vers .env.local')
  .example('$0 --env production --envPath .env.production', 'Synchronise production vers fichier spécifique')
  .argv;

async function main() {
  try {
    let result;
    
    if (argv.smart && !argv.envPath) {
      // Utilise la synchronisation intelligente
      result = await smartSync({
        env: argv.env,
        envPath: argv.envPath
      });
      
      if (isNextProject()) {
        console.log('🚀 Projet Next.js détecté - variables synchronisées dans .env.local');
      }
    } else {
      // Utilise la synchronisation classique
      result = await syncEnv({
        env: argv.env,
        envPath: argv.envPath
      });
    }
    
    console.log(`✅ ${result.added} nouvelle(s) variable(s) ajoutée(s) depuis Infisical`);
    
    if (result.added > 0 && isNextProject()) {
      console.log('💡 Redémarrez votre serveur de développement Next.js pour voir les changements');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error.message);
    process.exit(1);
  }
}

main();
