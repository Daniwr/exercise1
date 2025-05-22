const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/temperatura", (req, res) => {
  res.json({ valor: `${10} °C`, timestamp: new Date().toISOString()});
});

app.get("/uni", (req, res) => {
  res.json({ universidad: "Universidad Tecnologica de la Laguna"});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});