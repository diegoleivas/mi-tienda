import React, { useState, useEffect } from "react";
import NuevoProducto from "../components/NuevoProducto";
import ProductoList from "../components/ProductoList";
import EliminarProducto from "../components/EliminarProducto";
import EditarProducto from "../components/EditarProducto";



import "./PanelInterno.css";

function PanelInterno() {
  const [activePanel, setActivePanel] = useState("listar"); // arranca mostrando listado
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/abm")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/abm/productos/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      setProductos(productos.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  return (
    <div className="panel-container">
      <h2>Panel Interno</h2>

      {/* Cards para elegir panel */}
      <div className="cards-grid">
        <div className="card" onClick={() => setActivePanel("alta")}>
          <h3>Alta de producto</h3>
        </div>

        <div className="card" onClick={() => setActivePanel("listar")}>
          <h3>Listado de productos</h3>
        </div>

        <div className="card" onClick={() => setActivePanel("eliminar")}>
          <h3>Eliminar producto</h3>
        </div>
        <div className="card" onClick={() => setActivePanel("editar")}>
        <h3>Editar producto</h3>
       </div>


        
      </div>

      {/* Panel dinámico debajo de las cards */}
      <div className="panel-content">
        {activePanel === "alta" && (
          <div>
            <h3>Formulario de Alta</h3>
            <NuevoProducto />
          </div>
        )}

        {activePanel === "listar" && (
          <div>
            <h3>Listado de productos</h3>
            <ProductoList />
            <ul>
              {productos.map(p => (
                <li key={p.id}>
                  <img src={p.imagen} alt={p.nombre} width="50" />
                  {p.nombre} - ${p.precio}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activePanel === "eliminar" && (
          <div>
            <h3>Eliminar producto</h3>
            <EliminarProducto />
            <ul>
              {productos.map(p => (
                <li key={p.id}>
                  {p.nombre}
                  <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activePanel === "editar" && (
  <div>
    <h3>Editar producto</h3>
    <EditarProducto />
  </div>
)}


      </div>
    </div>
  );
}

export default PanelInterno;
