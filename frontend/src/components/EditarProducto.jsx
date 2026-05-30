import { useState, useEffect } from "react";
import axios from "axios";
import "./EditarProducto.css";

const API_URL = "https://mi-tienda-9ku2.onrender.com";

function EditarProducto() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get(`${API_URL}/abm/productos`, { withCredentials: true })
      .then((res) => {
        const data = res.data.productos || res.data.data || res.data;
        setProductos(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error al traer productos:", err));
  }, []);

  const handleEditClick = (producto) => {
    setEditando(producto.id);
    setFormData(producto);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`${API_URL}/abm/productos/${editando}`, formData, { withCredentials: true })
      .then(() => {
        alert("Producto actualizado ✅");

        setProductos(productos.map(p =>
          p.id === editando ? { ...formData, id: editando } : p
        ));

        setEditando(null);
      })
      .catch((err) => console.error("Error al actualizar producto:", err));
  };

  return (
    <div className="editar-producto">
      <ul className="lista-productos">
        {productos.map((p) => (
          <li key={p.id} className="item-producto">

            {/* ✅ IMAGEN CORREGIDA */}
            <img
              src={p.imagen}
              alt={p.nombre}
              className="miniatura"
            />

            {editando === p.id ? (
              <div className="info-producto">
                <input name="nombre" value={formData.nombre} onChange={handleChange} />
                <input name="precio" type="number" value={formData.precio} onChange={handleChange} />
                <input name="stock" type="number" value={formData.stock} onChange={handleChange} />
                <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
                <input name="categoria" value={formData.categoria} onChange={handleChange} />

                {/* 👇 IMPORTANTE */}
                <input
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="/uploads/archivo.jpg"
                />

                <button onClick={handleSave}>Guardar</button>
              </div>
            ) : (
              <div className="info-producto">
                <strong>{p.nombre}</strong>
                <span>Precio: ${p.precio}</span>
                <span>Stock: {p.stock}</span>
                <span>Categoría: {p.categoria}</span>
                <p>{p.descripcion}</p>
                <button onClick={() => handleEditClick(p)}>Editar</button>
              </div>
            )}

          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditarProducto;