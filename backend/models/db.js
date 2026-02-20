const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "diego",
  password: process.env.MYSQLPASSWORD || "1234",
  database: process.env.MYSQLDATABASE || "tienda",
  port: process.env.MYSQLPORT || 3306,
});

// 🔥 TESTEAR CONEXIÓN
connection.getConnection()
  .then(() => console.log("✅ Conexión a MySQL OK"))
  .catch(err => console.error("❌ Error en MySQL:", err));

module.exports = connection;