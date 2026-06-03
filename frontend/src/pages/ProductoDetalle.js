import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ProductoDetalle.css";

const API_URL = process.env.REACT_APP_API_URL;

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  if (!producto) return <p className="cargando">Cargando...</p>;

  return (
    <div className="detalle-container">
      <div className="detalle-imagen">
        <img src={producto.imagen} alt={producto.nombre} />
      </div>
      <div className="detalle-info">
        <h1 className="detalle-nombre">{producto.nombre}</h1>
        <p className="detalle-precio">${producto.precio}</p>
        <p className="detalle-descripcion">{producto.descripcion}</p>
        <p className="detalle-stock">Stock disponible: {producto.stock}</p>
        <button className="detalle-btn-carrito">Agregar al carrito</button>
      </div>
    </div>
  );
}

export default ProductoDetalle;