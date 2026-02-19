import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  // Si no hay usuario logueado, redirige al Home ("/")
  if (!user) {
    return <Navigate to="/" replace />;
  }
  // Si hay usuario, muestra el contenido protegido
  return children;
}
