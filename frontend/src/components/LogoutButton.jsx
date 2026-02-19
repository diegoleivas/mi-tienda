import React from "react";

export default function LogoutButton({ onLogout }) {
  const handleLogout = async () => {
    const res = await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    if (res.ok) {
      onLogout();
    }
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
