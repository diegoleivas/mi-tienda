import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function AbmInterno({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!onLogin) {
      console.error("onLogin no fue pasado como prop");
      setError("Error interno: falta función de login.");
      return;
    }

    try {
      const success = await onLogin(username, password);
      if (success) {
        navigate("/abm-interno"); // 👈 redirige al área protegida
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error en login");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login ABM Interno</h2>
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
        <button type="submit">Ingresar</button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
}

export default AbmInterno;
