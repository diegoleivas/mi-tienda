// frontend/src/components/ProductoCard.jsx
import "./ProductoCard.css";

// URL del backend según entorno
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function ProductoCard({ producto }) {
  return (
    <div className="card">
      <img
        src={`${API_URL}${producto.imagen}`} // 🔹 siempre apunta al backend
        alt={producto.nombre}
        className="card-img"
      />
      <div className="card-body">
        <h3 className="card-title">{producto.nombre}</h3>
        <p className="card-price">${producto.precio}</p>
        <p className="card-stock">Stock: {producto.stock}</p>
        <p className="card-desc">{producto.descripcion}</p>
        <button className="card-btn">Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductoCard;