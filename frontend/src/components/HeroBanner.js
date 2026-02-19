
function HeroBanner() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/banner.jpg')", // ✅ funciona con public
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "0 2px 4px rgba(0,0,0,0.6)"
        
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem",  color: "#8fcad6" }}>Fileteando Ando</h1>
      <button style={{ padding: "0.8rem 1.5rem", background: "#007bff", border: "none", borderRadius: "4px", color: "white", cursor: "pointer", fontWeight: "bold" }}>Ver Novedades»</button>
    </section>
  );
}

export default HeroBanner;
