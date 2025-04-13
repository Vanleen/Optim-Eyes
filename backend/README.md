# OptimEyes - Backend

Backend de l’application **OptimEyes**, une plateforme intelligente de diagnostic visuel et de recommandation de lunettes.

---

## Installation & Configuration

### 1. Cloner le projet

```bash
git clone https://github.com/ton-repo/OptimEyes.git
cd OptimEyes/backend
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Créer le fichier `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/OptimEyes
JWT_SECRET=ton_super_secret
STRIPE_SECRET_KEY=clé_stripe
PAYPAL_CLIENT_ID=clé_paypal
PAYPAL_SECRET=secret_paypal

ROBOFLOW_API_KEY=clé_roboflow
ROBOFLOW_MODEL_URL=https://infer.roboflow.com/face-shape-detection-xkvuc/5
ROBOFLOW_DIAG_MODEL_URL=https://classify.roboflow.com/diagnostic-visuel-yeux/1

OPENROUTER_API_KEY=clé_openrouter 
```

### 4. Démarrer le serveur

```bash
npm start
```

Le backend tourne maintenant sur `http://localhost:5000`

---

## Routes API

### Authentification & Utilisateurs

| Méthode | Endpoint             | Description |
|--------|-----------------------|-------------|
| POST   | `/api/users/register` | Inscription d’un nouvel utilisateur |
| POST   | `/api/users/login`    | Connexion et récupération du token JWT |
| GET    | `/api/users/profile`  | Récupération du profil utilisateur (🔒 JWT) |
| GET    | `/api/users/:id`      | Récupération d’un utilisateur par ID (🔒 JWT) |

---

### Lunettes

| Méthode | Endpoint         | Description |
|--------|-------------------|-------------|
| GET    | `/api/glasses`    | Récupérer toutes les lunettes |
| POST   | `/api/glasses`    | Ajouter une paire de lunettes |
| GET    | `/api/glasses/:id`| Récupérer une paire par ID |

---

### Recommandations intelligentes

- Recommandations déclenchées automatiquement si le message contient "lunettes", "verres", "monture", etc.
- Donne jusqu’à 3 suggestions depuis la base MongoDB.

---

### Chatbot ophtalmologique intelligent

| Méthode | Endpoint     | Description |
|--------|---------------|-------------|
| POST   | `/api/chat`   | Envoyer un message au chatbot |
| GET    | `/api/chat/history/:userId` | Récupérer l’historique du chatbot |

#### Fonctionnement :

- IA gratuite via OpenRouter (`Mistral` par défaut)
- Fallback codé en dur si l’IA échoue
- Spécialisé dans les **yeux, lunettes, ophtalmologie**

---

### Formulaire de santé

| Méthode | Endpoint        | Description |
|--------|------------------|-------------|
| POST   | `/api/form`      | Enregistrement du formulaire santé |
| GET    | `/api/form/:id`  | Récupération du formulaire utilisateur |

Champs enregistrés : prénom, nom, âge, poids, taille, rhésus, allergies.

---

### Diagnostic visuel des yeux (IA)

| Méthode | Endpoint                   | Description |
|--------|-----------------------------|-------------|
| POST   | `/api/ai/diagnosis`         | Diagnostic oculaire à partir d’une photo |

#### Fonctionnement :

1. Envoie l’image à **Roboflow**
2. Si Roboflow ne détecte rien, **fallback IA intelligente** (OpenRouter)
3. Si échec IA, **fallback codé en dur**
4. Réponse : nom du diagnostic, probabilité, conseil personnalisé

---

### Détection de forme du visage

| Méthode | Endpoint                | Description |
|--------|--------------------------|-------------|
| POST   | `/api/face/shape`        | Analyse de la forme du visage via photo |

- Utilise **Roboflow** uniquement (pas de Face++)
- Résultat : forme détectée (ronde, ovale, carrée, etc.)

---

## Sécurité & Authentification

- Authentification via **JWT**
- Routes protégées via `Bearer <token>`
- Hash de mot de passe avec bcrypt
- Stockage MongoDB sécurisé sur Atlas

---

## Intelligence Artificielle

### Moteur IA principal

- Utilise l’API **OpenRouter** (modèle `mistral`)
- Clé stockée dans `OPENROUTER_API_KEY`

### Fallback intelligent

- Si l’IA ne répond pas ou erreur :
  - ✅ Réponses précodées basées sur mots-clés (ex : brûlure, picotement, rougeur)
  - ✅ Réponses médicales informatives avec conseil de consulter

---

## Technologies utilisées

- Node.js / Express
- MongoDB + Mongoose
- JWT
- Roboflow (diagnostic et forme du visage)
- OpenRouter (IA)
- Stripe / PayPal (paiement)
- Postman (tests)

---

## À faire / Bonus

- Upload sécurisé d’images
- Notifications & relances patients
- Partage sécurisé de données santé
- Mode expert IA
- Tableau de bord des statistiques

---

## Tests API recommandés

1. ✅ Création de compte
2. ✅ Connexion utilisateur
3. ✅ Remplir le formulaire santé
4. ✅ Envoyer une image pour diagnostic (via Postman en form-data)
5. ✅ Tester des questions au chatbot :  
   - "J’ai les yeux secs et douloureux"  
   - "Quels verres me recommandes-tu ?"  
   - "J’ai les yeux qui grattent, que faire ?"

