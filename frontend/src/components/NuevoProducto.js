import { useState } from "react";
import { useProductos } from "./useProductos"; // 🔹 hook compartido
import "./NuevoProducto.css";

function NuevoProducto() {
  const { cargarProductos, API_URL } = useProductos(); // opcional si querés refrescar la lista
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
    categoria: "",
    imagen: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/abm/productos`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Producto agregado con éxito 🚀");
        console.log("Respuesta backend:", data);

        // 🔹 Limpiar formulario
        setFormData({
          nombre: "",
          precio: "",
          stock: "",
          descripcion: "",
          categoria: "",
          imagen: ""
        });

        // 🔹 Opcional: refrescar productos en la lista
        if (cargarProductos) cargarProductos();
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
        <input name="imagen" value={formData.imagen} onChange={handleChange} placeholder="/uploads/archivo.jpg" />

        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
}

export default NuevoProducto;