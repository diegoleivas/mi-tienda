import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = async (usuario, password) => {
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ usuario, password })
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.usuario);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  return { user, login, logout };
}
