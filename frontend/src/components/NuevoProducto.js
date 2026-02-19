import { useState } from "react";
import "./NuevoProducto.css"; // 👈 archivo de estilos

function NuevoProducto() {
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
  fetch("http://localhost:3001/abm/productos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(formData)
})

      .then((res) => res.json())
      .then((data) => {
        alert("Producto agregado con éxito 🚀");
        console.log(data);
      })
      .catch((err) => console.error("Error:", err));
  };

  return (
    <div className="nuevo-producto">
      <h2>Cargar nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="nombre" onChange={handleChange} required />

        <label>Precio</label>
        <input name="precio" type="number" step="0.01" onChange={handleChange} required />

        <label>Stock</label>
        <input name="stock" type="number" onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="descripcion" onChange={handleChange} />

        <label>Categoría</label>
        <input name="categoria" onChange={handleChange} />

        <label>Imagen (archivo)</label>
        <input name="imagen" onChange={handleChange} />

        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
}

export default NuevoProducto;
