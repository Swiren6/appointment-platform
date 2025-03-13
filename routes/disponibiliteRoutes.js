const express = require('express');
const disponibiliteController = require('../controller/disponibiliteController'); // Assurez-vous que le chemin est correct

const router = express.Router();

// Route pour récupérer les disponibilités d'un professionnel
router.get('/disponibilites', disponibiliteController.getDisponibilites);  // Assurez-vous que la route est correcte

// Route pour ajouter une disponibilité
router.post('/add', disponibiliteController.addDisponibilite);
module.exports = router;
