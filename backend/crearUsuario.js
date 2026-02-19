const bcrypt = require("bcrypt");
const db = require("./models/db");

async function crearUsuario() {
  const email = "admin@mail.com";
  const password = "27789318dal";

  const hash = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO usuarios (email, password) VALUES (?, ?)",
    [email, hash]
  );

  console.log("Usuario creado correctamente");
}

crearUsuario();