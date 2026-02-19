import { useState, useEffect } from "react";
import axios from "axios";
import "./EditarProducto.css"; // 👈 estilos separados

function EditarProducto() {
  const [productos, setProductos] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/abm/productos", { withCredentials: true })
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
    axios.put(`http://localhost:3001/abm/productos/${editando}`, formData, { withCredentials: true })
      .then(() => {
        alert("Producto actualizado ✅");
        setProductos(productos.map(p => p.id === editando ? formData : p));
        setEditando(null);
      })
      .catch((err) => console.error("Error al actualizar producto:", err));
  };

  return (
    <div className="editar-producto">
      
      <ul className="lista-productos">
        {productos.map((p) => (
          <li key={p.id} className="item-producto">
             <img
              src={`/images/${p.imagen}`}
              alt={p.nombre}
              className="miniatura"
            />


        {editando === p.id ? (
  <div className="info-producto">
    <input
      name="nombre"
      value={formData.nombre}
      onChange={handleChange}
      placeholder="Nombre"
    />
    <input
      name="precio"
      type="number"
      value={formData.precio}
      onChange={handleChange}
      placeholder="Precio"
    />
    <input
      name="stock"
      type="number"
      value={formData.stock}
      onChange={handleChange}
      placeholder="Stock"
    />
    <textarea
      name="descripcion"
      value={formData.descripcion}
      onChange={handleChange}
      placeholder="Descripción"
    />
    <input
      name="categoria"
      value={formData.categoria}
      onChange={handleChange}
      placeholder="Categoría"
    />
    <input
      name="imagen"
      type="text"
      value={formData.imagen}
      onChange={handleChange}
      placeholder="Nombre de archivo de imagen"
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
