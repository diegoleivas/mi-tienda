import "./ProductoCard.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

function ProductoCard({ producto }) {
  return (
    <div className="card">
      <img src={`${API_URL}${producto.imagen}`} alt={producto.nombre} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{producto.nombre}</h3>
        <p className="card-price">${producto.precio}</p>
        <p className="card-stock">Stock: {producto.stock}</p>
        <p className="card-desc">{producto.descripcion}</p>
      </div>
    </div>
  );
}

export default ProductoCard;