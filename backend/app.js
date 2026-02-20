const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/productos");
const verificarSesion = require("./middleware/verificarSesion");
const abmRoutes = require("./routes/abm");

const app = express();

// ✅ CORS CORRECTO
app.use(cors({
  origin: "https://fileteandoando.netlify.app", // 👈 TU FRONTEND REAL
  credentials: true
}));

app.use(express.json());

// ✅ SESIONES
app.use(session({
  secret: process.env.SESSION_SECRET || "claveSecreta",
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 30,
    secure: true,          // 🔥 importante en producción (https)
    sameSite: "none"       // 🔥 necesario para Netlify + Railway
  }
}));

// ✅ RUTAS
app.use("/abm", abmRoutes);

// Servir imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Públicas
app.use("/productos", productosRoutes);

// Protegidas
app.use("/admin/productos", verificarSesion, productosRoutes);

// Auth
app.use("/auth", authRoutes);

// ✅ PUERTO
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend en puerto ${PORT} 🚀`);
});