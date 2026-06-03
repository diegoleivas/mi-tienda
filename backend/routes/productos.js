const express = require("express");
const router = express.Router();
const pool = require("../models/db");

// Obtener productos públicos
router.get("/", async (req, res) => {
  const start = Date.now();
  try {
    console.log("Iniciando consulta a productos...");
    const { rows } = await pool.query("SELECT * FROM productos");
    const queryTime = Date.now() - start;
    console.log(`Consulta completada en ${queryTime}ms. Productos obtenidos: ${rows.length}`);
    res.json(rows);
  } catch (err) {
    console.error("Error en consulta:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM productos WHERE id = $1", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error en consulta:", err);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});





module.exports = router;