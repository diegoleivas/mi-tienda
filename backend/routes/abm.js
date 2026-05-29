const express = require("express");
const router = express.Router();
const pool = require("../models/db");
const multer = require("multer");
const path = require("path");

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Listar productos
router.get("/productos", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM productos");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Alta de producto
router.post("/productos", upload.single('imagen'), async (req, res) => {
  const { nombre, precio, stock, descripcion, categoria } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    const { rows } = await pool.query(
      "INSERT INTO productos (nombre, precio, stock, descripcion, categoria, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [nombre, precio, stock, descripcion, categoria, imagen]
    );
    res.json({ id: rows[0].id, nombre, precio, stock, descripcion, categoria, imagen });
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
    await pool.query(
      "UPDATE productos SET nombre=$1, precio=$2, stock=$3, descripcion=$4, categoria=$5, imagen=$6 WHERE id=$7",
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
    await pool.query("DELETE FROM productos WHERE id=$1", [id]);
    res.json({ message: "Producto eliminado", id });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

module.exports = router;