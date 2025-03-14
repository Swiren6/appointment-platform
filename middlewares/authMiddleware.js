const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ msg: "Token manquant." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // This is where the user is attached to the request
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token invalide ou expiré." });
    }
};


exports.roleMiddleware = (roles) => {
    return (req, res, next) => {
        // Vérifier si l'utilisateur a le rôle requis
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit." });
        }
        next();
    };
};