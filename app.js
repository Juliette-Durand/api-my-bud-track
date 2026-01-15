const express = require('express');
const app = express();

const roleAppRoutes = require('./routes/roleAppRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const typeAccountRoutes = require('./routes/typeAccountRoutes.js');
const catTransactionRoutes = require('./routes/catTransactionRoutes.js');
const accountRoutes = require('./routes/accountRoutes.js');

// Middleware pour traiter les données JSON
app.use(express.json());

// Utilisation du routeur pour les rôles de l'application sous la route /role-app
app.use('/role-app', roleAppRoutes);
// Utilisation du routeur pour les utilisateurs sous la route /users
app.use('/users', userRoutes);
// Utilisation du routeur pour les types de compte sous la route /type-account
app.use('/type-account', typeAccountRoutes);
// Utilisation du routeur pour les types de compte sous la route /category-transactions
app.use('/category-transactions', catTransactionRoutes);
// Utilisation du routeur pour les comptes sous la route /accounts
app.use('/accounts', accountRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});