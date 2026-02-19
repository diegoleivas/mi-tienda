const express = require("express");
const router = express.Router();
const connection = require("../models/db");

// Obtener productos (catálogo público)
router.get("/", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM productos");
    res.json(rows); // siempre array
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;
