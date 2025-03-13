const express = require('express');
const router = express.Router();
const disponibiliteController = require('../controller/disponibiliteController'); // Assurez-vous que le chemin est correct

// Route pour récupérer les disponibilités d'un professionnel
router.get('/disponibilites/:professionnelId', disponibiliteController.getDisponibilites);

// Route pour récupérer les rendez-vous d'un utilisateur (client ou professionnel)
router.get('/rendezvous/:utilisateurId/:role', disponibiliteController.getRendezVous);

module.exports = router;