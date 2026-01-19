import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  // ======================
  // ESTADO
  // ======================
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [productoIndex, setProductoIndex] = useState("");

  // ======================
  // PROTECCIÓN ADMIN
  // ======================
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (!usuario || usuario.rol !== "admin") {
      alert("Acceso restringido");
      navigate("/");
    }
  }, [navigate]);

  // ======================
  // CARGAR PRODUCTOS
  // ======================
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  const guardarProductos = (lista) => {
    localStorage.setItem("productos", JSON.stringify(lista));
    setProductos(lista);
  };

  // ======================
  // SUBMIT FORM
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevoProducto = {
      nombre,
      precio: Number(precio),
      imagen,
      descripcion
    };

    let lista = [...productos];

    if (productoIndex === "") {
      lista.push(nuevoProducto);
    } else {
      lista[productoIndex] = nuevoProducto;
    }

    guardarProductos(lista);
    limpiarFormulario();
  };

  const editarProducto = (index) => {
    const p = productos[index];
    setNombre(p.nombre);
    setPrecio(p.precio);
    setImagen(p.imagen);
    setDescripcion(p.descripcion);
    setProductoIndex(index);
  };

  const eliminarProducto = (index) => {
    const lista = [...productos];
    lista.splice(index, 1);
    guardarProductos(lista);
  };

  const limpiarFormulario = () => {
    setNombre("");
    setPrecio("");
    setImagen("");
    setDescripcion("");
    setProductoIndex("");
  };

  // ======================
  // JSX (HTML MIGRADO)
  // ======================
  return (
    <>
      {/* MAIN */}
      <main className="container my-5">
        <section>
          <h2 className="mb-4">Gestión de Productos</h2>

          {/* FORMULARIO */}
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
                placeholder="Descripción del producto"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
                required
              />
            </div>

            <div className="col-md-2 d-grid">
              <button className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>

          {/* TABLA */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Imagen</th>
                  <th>Descripción</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((p, index) => (
                  <tr key={index}>
                    <td>{p.nombre}</td>
                    <td>${p.precio}</td>
                    <td>
                      {p.imagen
                        ? <img src={p.imagen} width="50" />
                        : "Sin imagen"}
                    </td>
                    <td>{p.descripcion}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => editarProducto(index)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarProducto(index)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </section>
      </main>
    </>
  );
}
