const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/productos");
const verificarSesion = require("./middleware/verificarSesion");
const abmRoutes = require("./routes/abm");
const app = express();

// Esto va **primero**: permite que tu backend reciba JSON
app.use(express.json());

// 🔹 Middleware global de CORS: va **antes de las rutas**
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", (process.env.FRONTEND_URL || "https://fileteandoando.vercel.app/").replace(/\/$/, ''));
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

//  SESIONES


app.use(session({
  secret: process.env.SESSION_SECRET || "claveSecreta",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  }
}));

//  RUTAS
app.use("/abm", abmRoutes); // sin verificarSesion
app.use("/auth", authRoutes);
app.use("/productos", productosRoutes);
app.use("/admin/productos", verificarSesion, productosRoutes);



app.get("/", (req, res) => {
  res.send("Backend de mi-tienda funcionando 🚀");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT} 🚀`));