
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../models/User');
require('dotenv').config();

const authController = {
    // Inscription d'un nouvel utilisateur
    async register(req, res) {
        const { nom, email, motDePasse, dateNaissance, cin, numTel, role } = req.body;

        try {
            
            const utilisateurExiste = await Utilisateur.findOne({ email });
            if (utilisateurExiste) {
                return res.status(400).json({ message: "L'utilisateur existe déjà" });
            }

            // Hacher le mot de passe
            const salt = await bcrypt.genSalt(10);
            const motDePasseHache = await bcrypt.hash(motDePasse, salt);

            // Créer un nouvel utilisateur
            const nouvelUtilisateur = new Utilisateur({
                nom,
                email,
                motDePasse: motDePasseHache,
                dateNaissance,
                cin,
                numTel,
                role,
            });

            // Sauvegarder l'utilisateur dans la base de données
            await nouvelUtilisateur.save();

            // Générer un JWT
            const token = jwt.sign({ userId: nouvelUtilisateur._id, role: nouvelUtilisateur.role }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Le token expire après 1 heure
            });

            // Répondre avec le token, le nom et le rôle
            res.status(201).json({
                token,
                nom: nouvelUtilisateur.nom,
                role: nouvelUtilisateur.role,
            });
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
        }
    },

    // Connexion d'un utilisateur
    async login(req, res) {
        const { email, motDePasse } = req.body;

        try {
            // Vérifier si l'utilisateur existe
            const utilisateur = await Utilisateur.findOne({ email });
            if (!utilisateur) {
                return res.status(400).json({ message: "Email ou mot de passe incorrect" });
            }

            // Vérifier le mot de passe
            const motDePasseValide = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
            if (!motDePasseValide) {
                return res.status(400).json({ message: "Email ou mot de passe incorrect" });
            }

            // Générer un JWT
            const token = jwt.sign({ userId: utilisateur._id, role: utilisateur.role }, process.env.JWT_SECRET, {
                expiresIn: '1h', // Le token expire après 1 heure
            });

            // Répondre avec le token, le nom et le rôle
            res.json({
                token,
                nom: utilisateur.nom,
                role: utilisateur.role,
            });
        } catch (err) {
            res.status(500).json({ message: "Erreur lors de la connexion", error: err.message });
        }
    },
};

module.exports = authController;
