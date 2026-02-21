const express = require("express");
const router = express.Router();
const connection = require("../models/db");
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
router.post("/productos", upload.single('imagen'), async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  const { nombre, precio, stock, descripcion, categoria } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : '';
  console.log("Datos a insertar:", { nombre, precio, stock, descripcion, categoria, imagen });
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