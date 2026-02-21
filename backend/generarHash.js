const bcrypt = require("bcrypt");

async function generarHash() {
  const password = "27789318Dal";
  const hash = await bcrypt.hash(password, 10);
  console.log("Hash generado:", hash);
}

generarHash();
