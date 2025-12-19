const express = require('express');
const app = express();

const roleAppRoutes = require('./routes/roleAppRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

// Middleware pour traiter les données JSON
app.use(express.json());

// Utilisation du routeur pour les rôles de l'application sous la route /role-app
app.use('/role-app', roleAppRoutes);
// Utilisation du routeur pour les utilisateurs sous la route /users
app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});