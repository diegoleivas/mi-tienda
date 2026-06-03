import "./ProductoCard.css";
import { useNavigate } from "react-router-dom";

function ProductoCard({ producto }) {
  const imageUrl = producto.imagen;
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/producto/${producto.id}`)} style={{ cursor: "pointer" }}>
      <img src={imageUrl} alt={producto.nombre} className="card-img" />
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