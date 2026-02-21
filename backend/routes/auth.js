const express = require("express");
const router = express.Router();
const db = require("../models/db");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { username, password } = req.body; // usar username

  try {
    const [rows] = await db.query(
      "SELECT * FROM usuarios WHERE username = ?",
      [username] // usar username
    );

    if (!rows.length) return res.status(401).json({ mensaje: "Usuario no encontrado" });

    const user = rows[0];
    const passwordValida = await bcrypt.compare(password, user.password_hash);

    if (!passwordValida) return res.status(401).json({ mensaje: "Contraseña inválida" });

    // Guardar sesión
    req.session.user = { id: user.id, username: user.username };

    return res.json({ mensaje: "Login correcto", usuario: user.username });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: "Error en el servidor" });
  }
});

module.exports = router;
