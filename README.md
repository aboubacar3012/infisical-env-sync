# 🔐 Infisical Env Sync

Synchronisez vos secrets Infisical avec vos fichiers `.env` locaux en une seule commande.

## 🚀 Installation

```bash
npm install @aboubacar3012/infisical-env-sync
```

## ⚙️ Configuration

Créez un fichier `.env` avec vos credentials Infisical :

```env
CLIENT_ID=your_infisical_client_id
CLIENT_SECRET=your_infisical_client_secret
PROJECT_ID=your_infisical_project_id
```

## 🔧 Utilisation

### CLI

```bash
# Synchronise l'environnement 'dev' vers .env
infisical-env-sync

# Spécifier un environnement différent
infisical-env-sync --env production

# Spécifier un fichier différent
infisical-env-sync --envPath .env.local
```

### API JavaScript

```javascript
const { syncEnv } = require('@aboubacar3012/infisical-env-sync');

// Utilisation basique
const result = await syncEnv();
console.log(`${result.added} nouvelles variables ajoutées`);

// Avec options
await syncEnv({
  env: 'production',
  envPath: '.env.production'
});
```

## 📋 Options

| Option | Type | Défaut | Description |
|--------|------|--------|-------------|
| `env` | string | `dev` | Environnement Infisical |
| `envPath` | string | `.env` | Fichier de destination |

##  Sécurité

- Ajoutez `.env*` à votre `.gitignore`
- Ne commitez jamais vos credentials

---

Made with ❤️ by [Aboubacar Diallo](https://github.com/aboubacar3012)

