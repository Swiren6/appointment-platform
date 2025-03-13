const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    dateNaissance: { type: Date, required: true },
    cin:{type:Number, required: true },
    numTel:{type:Number, required: true },
    role: { type: String, enum: ['client', 'professionnel', 'admin'], required: true },
});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;