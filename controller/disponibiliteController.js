const Disponibilite = require('../models/disponibilite');
const RendezVous = require('../models/Appointment');

const disponibiliteController = {
    // Récupérer les disponibilités d'un professionnel
    async getDisponibilites(req, res) {
        try {
            const { professionnelId } = req.params;
            const disponibilites = await Disponibilite.find({ professionnelId });
            res.json(disponibilites);
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des disponibilités", error: err.message });
        }
    },

    // Récupérer les rendez-vous d'un utilisateur (client ou professionnel)
    async getRendezVous(req, res) {
        try {
            const { utilisateurId, role } = req.params;
            let rendezVous;

            if (role === 'client') {
                rendezVous = await RendezVous.find({ clientId: utilisateurId });
            } else if (role === 'professionnel') {
                rendezVous = await RendezVous.find({ professionnelId: utilisateurId });
            } else {
                return res.status(400).json({ message: "Rôle invalide" });
            }

            res.json(rendezVous);
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous", error: err.message });
        }
    },
};

module.exports = disponibiliteController; // Exportez le contrôleur