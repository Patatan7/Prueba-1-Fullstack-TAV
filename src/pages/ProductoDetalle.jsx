import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerProductos } from "../data/productos";
import { CarritoContext } from "../context/CarritoContext";

export default function ProductoDetalle() {
  const { id } = useParams();
  const indexProducto = Number(id);

  const { agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [otrosProductos, setOtrosProductos] = useState([]);

  useEffect(() => {
    const productos = obtenerProductos();
    const prod = productos[indexProducto];

    if (!prod) return;

    setProducto(prod);
    setOtrosProductos(productos.filter((_, i) => i !== indexProducto));
  }, [indexProducto]);

  if (!producto) {
    return (
      <main className="container my-5">
        <p>Producto no encontrado</p>
      </main>
    );
  }

  return (
    <main className="container my-5">

      {/* DETALLE PRODUCTO */}
      <section className="row mb-5">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid producto-img"
          />
        </div>

        <div className="col-md-6">
          <h2>{producto.nombre}</h2>

          <p className="text-muted">
            {producto.descripcion || "Sin descripción disponible"}
          </p>

          <h4 className="text-success">${producto.precio}</h4>

          <button
            className="btn btn-primary mt-3"
            onClick={() => agregarAlCarrito(producto)}
          >
            <i className="bi bi-cart-plus"></i> Añadir al carrito
          </button>
        </div>
      </section>

      {/* OTROS PRODUCTOS */}
      <section>
        <h3 className="mb-4">Otros productos</h3>

        <div className="row">
          {otrosProductos.map((p, i) => (
            <div className="col-md-3 mb-4" key={i}>
              <div className="card h-100">
                <img
                  src={p.imagen}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "contain" }}
                  alt={p.nombre}
                />

                <div className="card-body text-center">
                  <h6 className="card-title">{p.nombre}</h6>
                  <p className="card-text">${p.precio}</p>

                  <Link
                    to={`/producto/${i}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
