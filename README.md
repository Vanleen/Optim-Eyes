![Optim‑Eyes Logo](https://raw.githubusercontent.com/Vanleen/Optim-Eyes/main/frontend/public/logo192.png)

# Optim‑Eyes • Frontend

Ce dépôt contient la partie **cliente** de l’application **Optim‑Eyes** (Create React App + Tailwind CSS).  
Elle permet :
- De parcourir le catalogue de lunettes  
- De gérer un panier  
- Chatbot intelligent pour guider l'utilisateur  
- De s’authentifier  
- De payer via **Stripe Checkout** (hébergé) ou **PayPal**

---

## 🛠️ Technologies utilisées

- React.js (basé sur un template Creative Tim)
- Tailwind CSS / Material UI
- Intégration d'un chatbot interactif 
- API backend pour la gestion des données (développé par mon équipe)

---

## 📦 Installation locale

1. **Cloner** et se placer dans le dossier `frontend` :
   ```bash
   git clone https://github.com/Vanleen/Optim-Eyes.git
   cd Optim-Eyes/frontend

---

2. Installer les dépendances :

yarn install
# ou
npm install

---

3. Configurer vos variables d’environnement  en créant un fichier .env.local à la racine de frontend :
REACT_APP_API_URL=http://localhost:5000
# Si vous utilisez Stripe.js côté client :
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

---

4. Démarrer l’application :
yarn start
# ou
npm start

---

5. Ouvrir votre navigateur sur http://localhost:3000.

🌐 Variables d’environnement (Production)
Dans Vercel (Production & Preview), définissez exactement :

Clé : REACT_APP_API_URL
Valeur : https://optim-eyes.onrender.com	
Clé	: REACT_APP_STRIPE_PUBLIC_KEY
Valeur : Votre clé publishable Stripe (pk_test_…)

** Si vous utilisez uniquement le redirect hébergé par Stripe (via window.location.href), vous pouvez supprimer REACT_APP_STRIPE_PUBLIC_KEY.

---

🛠️ Scripts disponibles

Commande	Description
yarn start	Démarrage en mode développement (Hot Reload)
yarn build	Génère la build de production dans build/
yarn test	Lance les tests unitaires (Jest)
yarn eject	Éjecte la configuration CRA (irréversible)

** Remplacez yarn par npm si vous utilisez npm.

---

📁 Structure du projet
frontend/
├── public/               
│   ├── images/           # Photos de produits
│   ├── logo192.png       # Logo de l’appli
│   ├── favicon.png       # Icône navigateur
│   └── index.html        # Page HTML unique
├── src/
│   ├── api/              # Helpers axios (ex : paymentApi.js, authApi.js)
│   ├── assets/           # Autres ressources (icônes…)
│   ├── components/       # Composants réutilisables (CheckoutForm, Navbar…)
│   ├── context/          # AuthContext, etc.
│   ├── pages/            # Pages React (CheckoutPage, SuccessPage…)
│   ├── App.js            # Routes React Router
│   ├── index.js          # Point d’entrée
│   └── index.css         # Styles globaux (Tailwind)
├── .env.local            # Variables d’environnement locales
├── tailwind.config.js    # Config Tailwind CSS
├── postcss.config.js     # Config PostCSS
├── package.json          # Dépendances & scripts
└── README.md             # (Ce fichier)

---

💳 Flux de paiement Stripe (Checkout hébergé)
Clic “Payer” dans CheckoutForm

Front → POST ${API_URL}/api/payments/stripe avec { userId, glassId, quantity }

Backend crée une Checkout Session et renvoie { url }

Front fait window.location.href = url → redirection vers
https://checkout.stripe.com/pay/{sessionId}

Stripe gère le formulaire (numéro, date, CVC) et renvoie sur :
https://optim-eyes.vercel.app/success?session_id={SESSION_ID}

---

🚀 Déploiement
Commit & push vos modifications :

git add .
git commit -m "feat(frontend): mise à jour README et configuration payment"
git push origin main

Vercel détecte le push et déploie automatiquement le frontend.
Render déploie le backend (si lié au même repo GitHub).

---

Bonne continuation !
Pour toute question ou problème, n’hésitez pas à ouvrir une issue.
