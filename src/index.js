const express = require("express");
const app = express();

// Standard-Port oder 3000
const PORT = process.env.PORT || 3000;

// Einfache Route
app.get("/", (req, res) => {
  res.send("Hallo Welt! Express läuft.");
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
