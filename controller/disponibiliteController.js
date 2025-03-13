const Disponibilite = require('../models/disponibilite');
const RendezVous = require('../models/Appointment');

const disponibiliteController = {
    // Récupérer les disponibilités d'un professionnel
    async getDisponibilites(req, res) {
        try {
            const { professionnelId } = req.query;

            if (!professionnelId) {
                return res.status(400).json({ message: "professionnelId est requis" });
            }

            const disponibilites = await Disponibilite.find({ professionnelId });

            if (!disponibilites || disponibilites.length === 0) {
                return res.status(404).json({ message: "Aucune disponibilité trouvée pour ce professionnel" });
            }

            res.json(disponibilites);
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des disponibilités", error: err.message });
        }
    },

    // Ajouter une disponibilité
    async addDisponibilite(req, res) {
        try {
            const { professionnelId, date, heureDebut, heureFin } = req.body;
    
            // Vérifier que tous les champs requis sont présents
            if (!professionnelId || !date || !heureDebut || !heureFin) {
                return res.status(400).json({ message: "professionnelId, date, heureDebut et heureFin sont requis" });
            }
    
            // Créer une nouvelle disponibilité
            const nouvelleDisponibilite = new Disponibilite({
                professionnelId,
                date,
                heureDebut,
                heureFin
            });
    
            // Sauvegarder la disponibilité dans la base de données
            await nouvelleDisponibilite.save();
    
            // Répondre avec succès
            res.status(201).json({ msg: "Disponibilité ajoutée avec succès." });
        } catch (err) {
            console.error("Erreur lors de l'ajout de la disponibilité :", err);
            res.status(500).json({ message: "Erreur lors de l'ajout de la disponibilité", error: err.message });
        }
    },

    // Récupérer les rendez-vous d'un utilisateur
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

            if (!rendezVous || rendezVous.length === 0) {
                return res.status(404).json({ message: "Aucun rendez-vous trouvé pour cet utilisateur" });
            }

            res.json(rendezVous);
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la récupération des rendez-vous", error: err.message });
        }
    },
};

module.exports = disponibiliteController;
