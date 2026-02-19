const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/auth");   // 👈 solo una vez
const productosRoutes = require("./routes/productos");
const verificarSesion = require("./middleware/verificarSesion");
const abmRoutes = require("./routes/abm");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "claveSecreta",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 30 } // 30 minutos
}));


app.use("/abm", abmRoutes); 

// Servir imágenes desde la carpeta uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rutas públicas
app.use("/productos", productosRoutes);

// Rutas protegidas con sesión
app.use("/admin/productos", verificarSesion, productosRoutes);

// Rutas de autenticación
app.use("/auth", authRoutes);

app.listen(3001, () => {
  console.log("Servidor backend en puerto 3001 🚀");
});
