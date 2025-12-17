const express = require('express');
const app = express();

const roleAppRoutes = require('./routes/roleAppRoutes.js');

// Middleware pour traiter les données JSON
app.use(express.json());

// Utilisation du routeur pour les rôles de l'application sous la route /role-app
app.use('/role-app', roleAppRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});