const bcrypt = require("bcrypt");
const db = require("./models/db");

async function crearUsuario() {
  const username = "admin";
  const password = "27789318dal";

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO usuarios (username, password_hash, rol) VALUES (?, ?, ?)",
    [username, hash, "admin"]
  );

  console.log("Usuario creado correctamente");
}

crearUsuario();
