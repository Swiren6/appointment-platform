const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const disponibiliteRoutes = require('./routes/disponibiliteRoutes');
require('dotenv').config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());


app.use('/api', disponibiliteRoutes);


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅Connected to MongoDB ");
    })
    .catch((err) => {
        console.error("🚩Failed to connect to MongoDB :", err);
    });


app.use('/auth', authRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log('✅Server is running on port '+PORT);
});
const rendezVousRoutes = require("./routes/appointmentRoutes");
app.use("/api/rendezvous", rendezVousRoutes);