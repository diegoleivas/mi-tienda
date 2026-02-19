const express = require("express");
const router = express.Router();
const connection = require("../models/db");


// Listar productos (para el panel interno)
router.get("/productos", async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Alta de producto
router.post("/productos", async (req, res) => {
  const { nombre, precio, stock, descripcion, categoria, imagen } = req.body;
  try {
    const [result] = await connection.query(
      "INSERT INTO productos (nombre, precio, stock, descripcion, categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, precio, stock, descripcion, categoria, imagen]
    );
    res.json({ id: result.insertId, nombre, precio, stock, descripcion, categoria, imagen });
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// Editar producto
router.put("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, descripcion, categoria, imagen } = req.body;
  try {
    await connection.query(
      "UPDATE productos SET nombre=?, precio=?, stock=?, descripcion=?, categoria=?, imagen=? WHERE id=?",
      [nombre, precio, stock, descripcion, categoria, imagen, id]
    );
    res.json({ id, nombre, precio, stock, descripcion, categoria, imagen });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar producto
router.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await connection.query("DELETE FROM productos WHERE id=?", [id]);
    res.json({ message: "Producto eliminado", id });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;