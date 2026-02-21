import { useState } from "react";
import axios from "axios";
import "./NuevoProducto.css";

const API_URL = "https://mi-tienda-9ku2.onrender.com"; // misma URL que los demás módulos

function NuevoProducto() {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    categoria: ""
  });
  const [imagenFile, setImagenFile] = useState(null);

  // Cambios de inputs de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Selección de archivo
  const handleFileChange = (e) => {
    setImagenFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.precio) {
      alert("El nombre y el precio son obligatorios");
      return;
    }

    const data = new FormData();
    data.append("nombre", formData.nombre);
    data.append("precio", formData.precio);
    data.append("stock", formData.stock);
    data.append("descripcion", formData.descripcion);
    data.append("categoria", formData.categoria);
    if (imagenFile) data.append("imagen", imagenFile);

    axios.post(`${API_URL}/abm/productos`, data, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        alert("Producto agregado con éxito 🚀");
        console.log("Respuesta backend:", res.data);

        // Limpiar formulario
        setFormData({
          nombre: "",
          precio: "",
          stock: "",
          descripcion: "",
          categoria: ""
        });
        setImagenFile(null);
      })
      .catch((err) => console.error("Error al agregar producto:", err));
  };

  return (
    <div className="nuevo-producto">
      <h2>Cargar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="nombre" value={formData.nombre} onChange={handleChange} required />

        <label>Precio</label>
        <input
          name="precio"
          type="number"
          step="0.01"
          value={formData.precio}
          onChange={handleChange}
          required
        />

        <label>Stock</label>
        <input
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label>Descripción</label>
        <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />

        <label>Categoría</label>
        <input name="categoria" value={formData.categoria} onChange={handleChange} />

        <label>Imagen (archivo)</label>
        <input type="file" name="imagen" onChange={handleFileChange} />

        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
}

export default NuevoProducto;