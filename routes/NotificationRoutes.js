const express = require('express');
const Notification = require('../models/Notification'); // Assurez-vous que le chemin est correct
const { authMiddleware,roleMiddleware } = require('../middlewares/authMiddleware'); // Middleware d'authentification

const router = express.Router();

// Créer une notification
router.post('/create', authMiddleware,roleMiddleware(['admin']) ,async (req, res) => {
    try {
        const { type, message, destinataireId } = req.body;

        const notification = new Notification({
            type,
            message,
            destinataireId,
        });

        await notification.save();
        res.status(201).json({ msg: "Notification créée avec succès.", notification });
    } catch (error) {
        res.status(500).json({ msg: "Erreur serveur.", error: error.message });
    }
});

// Récupérer les notifications d'un utilisateur
router.get('/my', authMiddleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ destinataireId: req.user.userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ msg: "Erreur serveur.", error: error.message });
    }
});

// Supprimer une notification
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ msg: "Notification non trouvée." });
        }

        res.json({ msg: "Notification supprimée avec succès.", notification });
    } catch (error) {
        res.status(500).json({ msg: "Erreur serveur.", error: error.message });
    }
});

module.exports = router;