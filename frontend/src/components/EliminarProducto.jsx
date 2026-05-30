import { useState, useEffect } from "react";
import axios from "axios";
import "./EliminarProducto.css";

const API_URL = "https://mi-tienda-9ku2.onrender.com";

function EliminarProducto() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  // Cargar productos desde la API
  useEffect(() => {
    axios
      .get(`${API_URL}/abm/productos`, { withCredentials: true })
      .then((res) => {
        console.log("Respuesta del backend:", res.data); // 🔹 para debug
        const data = res.data.productos || res.data.data || res.data;
        setProductos(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error al traer productos:", err));
  }, []);

  // Alternar selección de checkbox
  const toggleSeleccion = (id) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((sel) => sel !== id) : [...prev, id]
    );
  };

  // Eliminar productos seleccionados
  const handleDelete = () => {
    if (seleccionados.length === 0) {
      alert("Seleccioná al menos un producto para eliminar");
      return;
    }

    Promise.all(
      seleccionados.map((id) =>
        axios.delete(`${API_URL}/abm/productos/${id}`, { withCredentials: true })
      )
    )
      .then(() => {
        alert("Productos eliminados ✅");
        setProductos((prev) =>
          prev.filter((p) => !seleccionados.includes(p.id || p.id_producto))
        );
        setSeleccionados([]);
      })
      .catch((err) => console.error("Error al eliminar productos:", err));
  };

  return (
    <div className="eliminar-producto">
      <ul className="lista-productos">
        {productos.map((p) => (
          <li key={p.id || p.id_producto} className="item-producto">
            <input
              type="checkbox"
              className="checkbox-color"
              checked={seleccionados.includes(p.id || p.id_producto)}
              onChange={() => toggleSeleccion(p.id || p.id_producto)}
            />
            <img
              src={p.imagen}
              alt={p.nombre}
              className="miniatura"
              onError={(e) => (e.target.src = "/images/default.jpg")}
            />
            <div className="info-producto">
              <strong>{p.nombre}</strong>
              <span>${p.precio}</span>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn-eliminar" onClick={handleDelete}>
        Eliminar seleccionados
      </button>
    </div>
  );
}

export default EliminarProducto;