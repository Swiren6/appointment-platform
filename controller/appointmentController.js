const RendezVous = require("../models/Appointment");
const Disponibilite = require("../models/disponibilite");

// 📌 Création d'un rendez-vous (Client)
exports.createRendezVous = async (req, res) => {
  try {
    const { date, heure, professionnelId } = req.body;

    // Vérifier si la disponibilité existe
    const disponibilite = await Disponibilite.findOne({
      professionnelId,
      date,
      heureDebut: { $lte: heure },
      heureFin: { $gte: heure },
    });

    if (!disponibilite) {
      return res.status(400).json({ msg: "Le professionnel n'est pas disponible à cette heure." });
    }

    const rendezVous = new RendezVous({
      date,
      heure,
      statut: "en attente",
      clientId: req.user.id,
      professionnelId,
    });

    await rendezVous.save();
    res.status(201).json({ msg: "Rendez-vous créé avec succès.", rendezVous });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};

// 📌 Modifier un rendez-vous (Client)
exports.updateRendezVous = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, heure } = req.body;

    const rendezVous = await RendezVous.findOne({ _id: id, clientId: req.user.id });
    if (!rendezVous) return res.status(404).json({ msg: "Rendez-vous non trouvé." });

    rendezVous.date = date;
    rendezVous.heure = heure;
    rendezVous.statut = "en attente"; // Remettre en attente après modification
    await rendezVous.save();

    res.json({ msg: "Rendez-vous mis à jour.", rendezVous });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};

// 📌 Annuler un rendez-vous (Client ou Professionnel)
exports.cancelRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    const rendezVous = await RendezVous.findOne({
      _id: id,
      $or: [{ clientId: req.user.id }, { professionnelId: req.user.id }],
    });

    if (!rendezVous) return res.status(404).json({ msg: "Rendez-vous non trouvé." });

    rendezVous.statut = "annulé";
    await rendezVous.save();

    res.json({ msg: "Rendez-vous annulé.", rendezVous });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};

// 📌 Confirmer un rendez-vous (Professionnel)
exports.confirmRendezVous = async (req, res) => {
  try {
    const { id } = req.params;

    const rendezVous = await RendezVous.findOne({ _id: id, professionnelId: req.user.id });
    if (!rendezVous) return res.status(404).json({ msg: "Rendez-vous non trouvé." });

    rendezVous.statut = "confirmé";
    await rendezVous.save();

    res.json({ msg: "Rendez-vous confirmé.", rendezVous });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};

// 📌 Consulter ses rendez-vous (Client ou Professionnel)
exports.getMyRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.find({
      $or: [{ clientId: req.user.id }, { professionnelId: req.user.id }],
    }).populate("clientId professionnelId", "nom email");

    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};

// 📌 Consulter tous les rendez-vous (Admin)
exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.find().populate("clientId professionnelId", "nom email");
    res.json(rendezVous);
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur." });
  }
};