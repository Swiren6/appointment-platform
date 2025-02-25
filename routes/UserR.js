  const express = require("express");
  const User = require("../models/User");
  const router = express.Router();


  // 1)Récupérer tous les utilisateurs
  router.get("/all", async (req, res) => {
    const users = await User.find();
    res.json(users);
  });


  //2)Récupérer un utilisateur par ID
  router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "404:User Not Found" });
    res.json(user);
  });


  //3)Créer un nouvel utilisateur
  router.post("/create", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  });


  // 4)Mettre à jour un utilisateur
  router.put("/update/:id", async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    res.status(201).json(updatedUser);
  });


  //5)Supprimer un utilisateur
  router.delete("/delete/:id", async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "User Deleted " });
  });



  module.exports = router;



