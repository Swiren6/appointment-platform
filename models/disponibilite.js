const mongoose = require('mongoose');

const disponibiliteSchema = new mongoose.Schema({
    date: { type: Date, required: true }, // Date de la disponibilité
    heureDebut: { type: String, required: true }, // Heure de début de la disponibilité
    heureFin: { type: String, required: true }, // Heure de fin de la disponibilité
    professionnelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence au professionnel
});

const Disponibilite = mongoose.model('Disponibilite', disponibiliteSchema);

module.exports = Disponibilite;