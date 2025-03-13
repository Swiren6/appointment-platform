const express = require("express");
const User = require("../models/User");
const router = express.Router();


// 1) Récupérer tous les utilisateurs
router.get("/all", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclure le mot de passe
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des utilisateurs", error: error.message });
  }
});

// 2) Récupérer un utilisateur par ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclure le mot de passe
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: error.message });
  }
});


// 3) Créer un nouvel utilisateur
router.post("/create", async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validation des champs requis
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    const newUser = new User({ firstName, lastName, email, password, role });
    await newUser.save();

    // Exclure le mot de passe dans la réponse
    const userResponse = newUser.toObject();
    delete userResponse.password;

    res.status(201).json(userResponse);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création de l'utilisateur", error: error.message });
  }
});

// 4) Mettre à jour un utilisateur
router.put("/update/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, role } = req.body;

    // Mettre à jour l'utilisateur
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, role },
      { new: true, runValidators: true } // Retourner l'utilisateur mis à jour et valider les champs
    ).select("-password"); // Exclure le mot de passe

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour de l'utilisateur", error: error.message });
  }
});

// 5) Supprimer un utilisateur
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur", error: error.message });
  }
});

module.exports = router;