const pool = new Pool({
  host: "aws-0-us-east-1.pooler.supabase.com",
  port: 6543,
  database: "postgres",
  user: "postgres.bswntxfgpuhvvqolraeg",
  password: "Fileteando2024",
  ssl: {
    rejectUnauthorized: false
  }
});