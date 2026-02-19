// frontend/src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link nav-inicio">Inicio</Link>
      <Link to="/abm" className="nav-link nav-abm">ABM Interno</Link>
      <Link to="/carrito" className="nav-link nav-carrito">Carrito</Link>
      {user && <button onClick={onLogout} className="nav-logout">Logout</button>}
    </nav>
  );
}

export default Navbar;
