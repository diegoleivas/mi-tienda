const express = require("express");
const router = express.Router();
const db = require("../models/db");

// Obtener productos públicos
router.get("/", async (req, res) => {
  const start = Date.now();
  try {
    console.log("Iniciando consulta a productos...");
    const [rows] = await db.query("SELECT * FROM productos");
    const queryTime = Date.now() - start;
    console.log(`Consulta completada en ${queryTime}ms. Productos obtenidos: ${rows.length}`);
    res.json(rows);
  } catch (err) {
    console.error("Error en consulta:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;