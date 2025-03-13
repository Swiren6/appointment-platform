const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ['rappel', 'annulation', 'confirmation'] }, // Type de notification
    message: { type: String, required: true }, // Contenu de la notification
    destinataireId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur', required: true }, // Référence à l'utilisateur destinataire
    dateEnvoi: { type: Date, default: Date.now }, // Date d'envoi de la notification
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;