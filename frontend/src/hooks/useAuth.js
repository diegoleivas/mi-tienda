import { useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }) // usar username
    });
    if (res.ok) {
      const data = await res.json();
      setUser(data.usuario || data.username); // según lo que devuelva el backend
      return true;
    }
    return false;
  };

  const logout = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include"
    });
    setUser(null);
  };

  return { user, login, logout };
}
