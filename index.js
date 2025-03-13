const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://abdelkhaleksirinette6:Cluster0@cluster0.cbdu5.mongodb.net/')
    .then(() => {
        console.log("Base de données connectée avec succès");
    })
    .catch((err) => {
        console.error("Erreur de connexion à la base de données :", err);
    });


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

app.get('/rendez-vous', (req, res) => {
    res.send("Bienvenu");
});