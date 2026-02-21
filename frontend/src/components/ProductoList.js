import { useState, useEffect } from "react";
import axios from "axios";
import "./ProductoList.css";

const API_URL = "https://mi-tienda-9ku2.onrender.com";

function ProductoList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/abm/productos`, { withCredentials: true })
      .then((res) => {
        console.log("Respuesta backend:", res.data);

        const data = res.data.productos || res.data.data || res.data;
        setProductos(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error al traer productos:", err);
        setProductos([]);
      });
  }, []);

  return (
    <div className="listado-productos">
      <ul className="lista-productos">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <li key={producto.id} className="item-producto">
              
             <img
               src={`${API_URL}${producto.imagen}`}
               alt={producto.nombre}
               className="miniatura"
            />

              <div className="info-producto">
                <strong>{producto.nombre}</strong>
                <span>Precio: ${producto.precio}</span>
                <span>Stock: {producto.stock}</span>
                <span>Categoría: {producto.categoria}</span>
                <p>{producto.descripcion}</p>
              </div>

            </li>
          ))
        ) : (
          <li>No hay productos disponibles</li>
        )}
      </ul>
    </div>
  );
}

export default ProductoList;