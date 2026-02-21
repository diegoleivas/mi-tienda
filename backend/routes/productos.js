const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Obtener productos públicos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;