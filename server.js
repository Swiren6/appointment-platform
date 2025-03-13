const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const disponibiliteRoutes = require('./routes/disponibiliteRoutes');
const rendezVousRoutes = require('./routes/appointmentRoutes');  // Assure-toi que ce fichier existe
require('dotenv').config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use('/api', disponibiliteRoutes);  // Route pour disponibilités
app.use("/api/rendezvous", rendezVousRoutes);  // Route pour rendez-vous

// Route pour authentification
app.use('/auth', authRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅Connected to MongoDB ");
    })
    .catch((err) => {
        console.error("🚩Failed to connect to MongoDB :", err);
    });

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('✅Server is running on port ' + PORT);
});
