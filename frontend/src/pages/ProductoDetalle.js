import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = process.env.REACT_APP_API_URL;

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/productos/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data));
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div>
      <img src={producto.imagen} alt={producto.nombre} />
      <h2>{producto.nombre}</h2>
      <p>${producto.precio}</p>
      <p>{producto.descripcion}</p>
      <p>Stock: {producto.stock}</p>
    </div>
  );
}
export default ProductoDetalle;