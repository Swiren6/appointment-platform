const express = require("express");
const Appointment = require("../models/Appointment");
const sendEmail = require("../utils/email");
const router = express.Router();

// Créer un rendez-vous
router.post("/create", async (req, res) => {
  try {
    const { clientId, professionalId, date, clientEmail } = req.body;

    // Validation des champs requis
    if (!clientId || !professionalId || !date || !clientEmail) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const appointment = new Appointment({ clientId, professionalId, date });
    await appointment.save();

    // Envoyer un email au client
    const emailSubject = "Nouveau rendez-vous créé";
    const emailText = `Votre rendez-vous du ${date.toLocaleString()} a été créé avec succès.`;
    const emailHtml = `
      <h1>Nouveau rendez-vous créé</h1>
      <p>Votre rendez-vous du ${date.toLocaleString()} a été créé avec succès.</p>
    `;
    await sendEmail(clientEmail, emailSubject, emailText, emailHtml);

    res.status(201).json(appointment);
  } catch (error) {
    console.error("Erreur lors de la création du rendez-vous :", error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;