import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import {
  obtenerProductoPorId,
  obtenerProductos
} from "../data/productosApi";
import { formatoCLP } from "../utils/formatoMoneda";

export default function ProductoDetalle() {
  const { id } = useParams();
  const { carrito, agregarAlCarrito } = useContext(CarritoContext);

  const [producto, setProducto] = useState(null);
  const [otrosProductos, setOtrosProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const prod = await obtenerProductoPorId(id);
        if (!prod) {
          setError("Producto no encontrado");
          return;
        }

        setProducto(prod);

        const todos = await obtenerProductos();
        setOtrosProductos(todos.filter(p => p.id !== prod.id));
      } catch (err) {
        console.error(err);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }

    cargar();
  }, [id]);

  if (loading) {
    return (
      <main className="container my-5 text-center">
        <p>Cargando producto...</p>
      </main>
    );
  }

  if (error || !producto) {
    return (
      <main className="container my-5 text-center text-danger">
        <p>{error}</p>
      </main>
    );
  }

  const cantidadEnCarrito = carrito.filter(
    p => p.id === producto.id
  ).length;

  const sinStock = cantidadEnCarrito >= producto.stock;

  return (
    <main className="container my-5">

      {/* DETALLE */}
      <section className="row mb-5">
        <div className="col-md-6">
          <img
            src={producto.imagen || "/img/no-image.png"}
            onError={(e) => e.target.src = "/img/no-image.png"}
            alt={producto.nombre}
            className="img-fluid producto-img"
          />
        </div>

        <div className="col-md-6">
          <h2>{producto.nombre}</h2>

          <p className="text-muted">
            {producto.descripcion || "Sin descripción disponible"}
          </p>

          <h4 className="text-success">
            {formatoCLP(producto.precio)}
          </h4>

          <p className="text-muted">
            Stock: {producto.stock}
          </p>

          <button
            className="btn btn-primary mt-3"
            disabled={sinStock}
            onClick={() => agregarAlCarrito(producto)}
          >
            {sinStock ? "Agotado" : "Añadir al carrito"}
          </button>
        </div>
      </section>

      {/* OTROS PRODUCTOS */}
      {otrosProductos.length > 0 && (
        <section>
          <h3 className="mb-4">Otros productos</h3>

          <div className="row">
            {otrosProductos.map((p) => {
              const cantidadOtros = carrito.filter(
                c => c.id === p.id
              ).length;

              const sinStockOtros = cantidadOtros >= p.stock;

              return (
                <div className="col-md-3 mb-4" key={p.id}>
                  <div className="card h-100">
                    <img
                      src={p.imagen || "/img/no-image.png"}
                      onError={(e) => e.target.src = "/img/no-image.png"}
                      className="card-img-top"
                      style={{ height: "150px", objectFit: "contain" }}
                      alt={p.nombre}
                    />

                    <div className="card-body text-center">
                      <h6 className="card-title">{p.nombre}</h6>
                      <p className="card-text">
                        {formatoCLP(p.precio)}
                      </p>

                      <p className="text-muted">
                        Stock: {p.stock}
                      </p>

                      <div className="d-grid gap-2">
                        <Link
                          to={`/producto/${p.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          Ver detalle
                        </Link>

                        <button
                          className="btn btn-primary btn-sm"
                          disabled={sinStockOtros}
                          onClick={() => agregarAlCarrito(p)}
                        >
                          {sinStockOtros ? "Agotado" : "Añadir al carrito"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

    </main>
  );
}
