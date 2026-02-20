// frontend/src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner";
import ProductoCard from "../components/ProductoCard";
import Footer from "../components/Footer";

// ✅ URL del backend según el entorno
// - Local: REACT_APP_API_URL no definida → localhost
// - Producción: REACT_APP_API_URL definida en Netlify
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
//const API_URL = "https://mi-tienda-production-2c4a.up.railway.app";

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => {
        console.log("HOME data:", data);
        setProductos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setProductos([]);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <HeroBanner
        title="Fileteando Ando"
        subtitle="Descubrí nuestras piezas únicas"
        imageUrl="/images/banner.jpg"
        buttonText="Ver productos"
        buttonLink="/productos"
      />

      <h2 style={{ textAlign: "center", margin: "2rem 0" }}>
        Nuestros Productos Destacados
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <p>Cargando productos...</p>
        ) : productos.length > 0 ? (
          productos.map((p) => <ProductoCard key={p.id} producto={p} />)
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Home;