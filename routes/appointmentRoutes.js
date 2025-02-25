const express = require('express');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Créer un rendez-vous
router.post('/create', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Récupérer les rendez-vous
router.get('/all', async (req, res) => {
  const appointments = await Appointment.find().populate('clientId professionalId');
  res.json(appointments);
});

// Modifier un rendez-vous
router.put('/update/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Supprimer un rendez-vous
router.delete('/delete/:id', async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Rendez-vous annulé' });
});

module.exports = router;
