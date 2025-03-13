
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.authMiddleware = (req, res, next) => {
    
    const token = req.header("Authorization")?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Pas de token." });
    }

    try {
       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (err) {
        res.status(400).json({ message: "Token invalide." });
    }
};


exports.roleMiddleware = (roles) => {
    return (req, res, next) => {
       
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Accès interdit." });
        }
        next(); 
    };
};
