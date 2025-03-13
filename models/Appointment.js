
const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    heure: { type: String, required: true }, // Heure du rendez-vous
    statut: { type: String, required: true, enum: ['confirmé', 'annulé', 'en attente'] }, // Statut du rendez-vous
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence au client
    professionnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence au professionnel
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

module.exports = RendezVous;
