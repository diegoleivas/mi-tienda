import React, { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación mínima
    if (!usuario || !password) {
      alert("Completa usuario y contraseña");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔑 para que viaje la cookie
        body: JSON.stringify({ usuario, password })
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login correcto:", data);
        onLogin(data.usuario); // avisar al padre que se logueó
        navigate("/abm-interno");
      } else {
        let error = null;
        try {
          error = await res.json();
        } catch {}
        console.error("Error en login:", error?.mensaje || "Error desconocido");
        alert(error?.mensaje || "Error en login");
      }
    } catch (err) {
      console.error("Error en fetch:", err);
      alert("Error de conexión al servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Login"}
      </button>
    </form>
  );
}
