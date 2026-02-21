const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");
const productosRoutes = require("./routes/productos");
const verificarSesion = require("./middleware/verificarSesion");
const abmRoutes = require("./routes/abm");

const app = express();

// ✅ CORS: permite tu frontend local y remoto
app.use(cors({
  origin: [
    
    "https://fileteandoando.netlify.app" // tu Netlify real
  ],
  credentials: true
}));

app.use(express.json());

// ✅ SESIONES
app.use(session({
  secret: process.env.SESSION_SECRET || "claveSecreta",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 30, // 30 min
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
  }
}));

// ✅ Rutas
app.use("/abm", abmRoutes);
app.use("/auth", authRoutes);

// Imágenes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Productos públicos
app.use("/productos", productosRoutes);

// Productos protegidos
app.use("/admin/productos", verificarSesion, productosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor backend en puerto ${PORT} 🚀`));

app.get("/", (req, res) => {
  res.send("Backend de mi-tienda funcionando 🚀");
});
