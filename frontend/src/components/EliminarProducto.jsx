import { useState, useEffect } from "react";
import axios from "axios";
import "./EliminarProducto.css"; // 👈 archivo de estilos

function EliminarProducto() {
  const [productos, setProductos] = useState([]);
  const [seleccionados, setSeleccionados] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/abm/productos")
      .then((res) => {
        const data = res.data.productos || res.data.data || res.data;
        setProductos(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error al traer productos:", err));
  }, []);

  const toggleSeleccion = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((sel) => sel !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };

  const handleDelete = () => {
    if (seleccionados.length === 0) {
      alert("Seleccioná al menos un producto para eliminar");
      return;
    }

    Promise.all(
      seleccionados.map((id) =>
        axios.delete(`http://localhost:3001/abm/productos/${id}`)
      )
    )
      .then(() => {
        alert("Productos eliminados ✅");
        setProductos(productos.filter((p) => !seleccionados.includes(p.id)));
        setSeleccionados([]);
      })
      .catch((err) => console.error("Error al eliminar productos:", err));
  };

  return (
    <div className="eliminar-producto">
      
      <ul className="lista-productos">
        {productos.map((p) => (
          <li key={p.id} className="item-producto">
            <input
              type="checkbox"
              className="checkbox-color"
              checked={seleccionados.includes(p.id)}
              onChange={() => toggleSeleccion(p.id)}
            />
            <img
              src={`/images/${p.imagen}`}
              alt={p.nombre}
              className="miniatura"
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
