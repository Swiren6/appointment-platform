const mongoose = require("mongoose");

const rendezVousSchema = new mongoose.Schema({
    date: { type: Date, required: true }, 
    heure: { type: String, required: true }, // Assurez-vous qu'il s'agit bien d'une string
    professionnelId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true }, 
    statut: { type: String, required: true, enum: ["en attente", "confirmé", "annulé"], default: "en attente" }
});

const RendezVous = mongoose.model("rendezvous", rendezVousSchema);
module.exports = RendezVous;
