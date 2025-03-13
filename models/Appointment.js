const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    heure: { type: String, required: true },
    statut: { type: String, required: true, enum: ['confirmé', 'annulé', 'en attente'] },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
    professionnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true },
});

const RendezVous = mongoose.model('RendezVous', rendezVousSchema);

module.exports = RendezVous;