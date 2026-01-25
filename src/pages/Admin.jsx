import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../data/productosApi";

export default function Admin() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [metricas, setMetricas] = useState(null);

  // PROTECCIÓN ADMIN
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario || usuario.rol !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  // CARGAR PRODUCTOS
  useEffect(() => {
    cargar();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/metricas")
      .then(res => res.json())
      .then(data => setMetricas(data))
      .catch(console.error);
  }, []);

  const cargar = async () => {
    const data = await obtenerProductos();
    setProductos(data);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const producto = {
      nombre,
      precio: Number(precio),
      imagen,
      descripcion,
    };

    try {
      if (id) {
        await actualizarProducto(id, producto);
      } else {
        await crearProducto(producto);
      }

      limpiar();
      await cargar();
    } catch (error) {
      alert(error.message);
    }
  };

  const editar = (p) => {
    setId(p.id);
    setNombre(p.nombre);
    setPrecio(p.precio);
    setImagen(p.imagen || "");
    setDescripcion(p.descripcion || "");
  };

  const eliminar = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await eliminarProducto(id);
    cargar();
  };

  const limpiar = () => {
    setId(null);
    setNombre("");
    setPrecio("");
    setImagen("");
    setDescripcion("");
  };

  return (
    <main className="container my-5">
      <h2>Gestión de Productos</h2>

      {metricas && (
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card text-center p-3">
              <h6>Ingresos del Mes</h6>
              <h3 className="text-succes">
                ${metricas.totalMes}
              </h3>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card text-center p-3">
              <h6>Producto más vendido</h6>
              <h5>
                {metricas.productoTop
                  ? metricas.productoTop.nombre
                  : "Sin ventas registradas"}
              </h5>
            </div>
          </div>
        </div>
      )}

      <form className="row g-3 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Precio"
            value={precio}
            onChange={e => setPrecio(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <input
            className="form-control"
            placeholder="URL Imagen"
            value={imagen}
            onChange={e => setImagen(e.target.value)}
          />
        </div>

        <div className="col-12">
          <textarea
            className="form-control"
            rows="3"
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            required
          />
        </div>

        <div className="col-md-2 d-grid">
          <button className="btn btn-primary">
            {id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>${p.precio}</td>
              <td>{p.imagen && <img src={p.imagen} width="50" />}</td>
              <td>{p.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editar(p)}
                >
                  ✏
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminar(p.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
