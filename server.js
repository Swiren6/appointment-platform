const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


const userRoutes = require("./routes/UserR");


dotenv.config();
const app = express();
app.use(express.json());//beche ya9ra les requests en format json

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error(err));
  app.use("/users", userRoutes);//activer les routes users 

  app.get("/", (req, res) => {
    res.send("Welcome ");
  });

// machi el serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅Serveur démarré sur le port ${PORT}`);
});