import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Completa usuario y contraseña");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }) // usar username
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Login correcto:", data);
        onLogin(data.username); // avisar al padre que se logueó
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
