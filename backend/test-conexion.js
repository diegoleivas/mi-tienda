const { Pool } = require("pg");

const pool = new Pool({
  host: "db.bswntxfgpuhvvqolraeg.supabase.co",
  port: 5432,
  database: "postgres",
  user: "postgres",
  password: "Fileteando2024",
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query("SELECT current_user", (err, res) => {
  if (err) {
    console.error("Error:", err.message);
  } else {
    console.log("Conectado como:", res.rows[0]);
  }
  pool.end();
});