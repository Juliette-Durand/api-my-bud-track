# MyBudTrack API

API back-end développée exclusivement pour le projet **MyBudTrack**.

**MyBudTrack** est une application web de suivi de budget personnel permettant aux utilisateurs de gérer leurs revenus, dépenses et catégories de manière structurée.

Cette API fournit l’ensemble des endpoints nécessaires au bon fonctionnement de l’application.

---

## 🛠️ Stack technique

- **Node.js**
- **Express**
- **Prisma ORM**
- **Base de données :** PostgreSQL

---

## 📁 Structure du projet

```txt
├── app.js                # Point d’entrée principal de l’API
├── routes/               # Définition des routes Express
├── controllers/          # Gestion des requêtes / réponses
├── services/             # Logique métier
├── repositories/         # Accès aux données (Prisma)
├── middleware/           # Middlewares (auth, validation, etc.)
├── prisma/               # Schéma Prisma, migrations et client
├── package.json
└── README.md
```

---

## ⚙️ Installation
1. Installer les dépendances :

```bash
npm install
```

2. Créer le fichier d’environnement :

```bash
cp .env.example .env
```
3. Configurer la variable ```DATABASE_URL``` dans le fichier ```.env```

4. Initialiser la base de données :

```bash
npx prisma migrate dev
npx prisma generate
```

5. Lancer le serveur :

```bash
node app.js
```

---

## 🎯 Objectif du projet

Cette API a été conçue spécifiquement pour répondre aux besoins fonctionnels de **MyBudTrack**. Elle n’a pas vocation à être générique ou réutilisée dans un autre contexte.


## 📌 Versions et suivi

- **Version actuelle** : 1.0.0  
- **Date de création** : 15/12/2025  
- **Dernière modification** : 15/12/2025

Projet réalisé par Juliette DURAND, dans le cadre de la formation ***Concepteur Développeur d'Applications*** réalisée au sein du **CCI Campus de Strasbourg**.