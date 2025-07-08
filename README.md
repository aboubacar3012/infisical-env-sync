# 🔐 Infisical Env Sync

Une librairie Node.js simple et puissante pour synchroniser automatiquement vos secrets Infisical avec vos fichiers `.env` locaux.

## 📖 À propos

**Infisical Env Sync** simplifie la gestion de vos variables d'environnement en permettant une synchronisation transparente entre vos secrets stockés dans Infisical et vos fichiers `.env` locaux. 

### ✨ Fonctionnalités principales

- 🚀 **Synchronisation automatique** : Récupère et met à jour vos variables d'environnement en une commande
- 🔒 **Sécurisé** : Utilise l'API officielle Infisical avec authentification Universal Auth
- 🎯 **Intelligent** : N'ajoute que les nouvelles variables, préserve vos configurations existantes
- 🛠️ **Flexible** : Support CLI et API programmatique
- 🌍 **Multi-environnements** : Gestion facile de dev, staging, production, etc.
- 📝 **Sans conflit** : Préserve le formatage et les commentaires de vos fichiers `.env`

### 🎯 Cas d'usage

- **Développement en équipe** : Synchronisez rapidement les nouvelles variables d'environnement
- **Déploiement** : Automatisez la récupération des secrets pour vos environnements
- **Onboarding** : Simplifiez la configuration pour les nouveaux développeurs
- **DevOps** : Intégrez dans vos pipelines CI/CD pour une gestion centralisée des secrets

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
SITE_URL=https://app.infisical.com # URL de votre instance Infisical
```

## 🔧 Utilisation

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

