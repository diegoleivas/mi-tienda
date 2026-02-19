const express = require("express");
const router = express.Router();
const db = require("../models/db"); // conexión correcta
const bcrypt = require("bcrypt");

// Login contra la base
router.post("/login", async (req, res) => {
  const { usuario, password } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ mensaje: "Usuario no encontrado" });
    }

    const user = rows[0];

    // comparar contraseña con hash
    const passwordValida = await bcrypt.compare(
      password,
      user.password_hash
    );

    console.log("Usuario encontrado:", user);
    console.log("Password válida:", passwordValida);

    if (passwordValida) {
      req.session.user = {
        id: user.id,
        username: user.username
      };

      return res.json({
        mensaje: "Login correcto",
        usuario: user.username
      });
    } else {
      return res.status(401).json({
        mensaje: "Contraseña inválida"
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      mensaje: "Error en el servidor"
    });
  }
});

module.exports = router;
