const express = require("express");
const {
  createRendezVous,
  updateRendezVous,
  cancelRendezVous,
  confirmRendezVous,
  getMyRendezVous,
  getAllRendezVous,
} = require("../controller/appointmentControllers");

const { authMiddleware, roleMiddleware } = require("../middlewares/authMiddleware"); // ✅ Vérifie l'importation

const router = express.Router();

// Routes pour les clients
router.post("/create", authMiddleware, roleMiddleware(["client"]), createRendezVous);
router.put("/update/:id", authMiddleware, roleMiddleware(["client"]), updateRendezVous);
router.put("/cancel/:id", authMiddleware, roleMiddleware(["client", "professionnel"]), cancelRendezVous);

// Routes pour les professionnels
router.put("/confirm/:id", authMiddleware, roleMiddleware(["professionnel"]), confirmRendezVous);
router.get("/my", authMiddleware, roleMiddleware(["client", "professionnel"]), getMyRendezVous);

// Routes pour l'administrateur
router.get("/all", authMiddleware, roleMiddleware(["admin"]), getAllRendezVous);

module.exports = router;