  const express = require('express');
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');


const userRoutes = require("./routes/UserR");
const appointmentRoutes = require('./routes/appointmentRoutes');


require('dotenv').config();
  const app = express();
  app.use(express.json());//beche ya9ra les requests en format json



//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error(err));
  app.use("/users", userRoutes);//activer les routes users 
  app.use('/appointments', appointmentRoutes); //activer les routes appointments
  app.get("/", (req, res) => {
    res.send("hello ");
  });


  // machi el serveur
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`✅Serveur démarré sur le port ${PORT}`);
  });