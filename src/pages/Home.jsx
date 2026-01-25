import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../data/productosApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProductos()
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("No se pudieron cargar los productos");
        setLoading(false);
      });
  }, []);

  return (
    <main className="container mt-4">

      {/* BIENVENIDA */}
      <section className="text-center">
        <h1>Bienvenido a la tienda</h1>
        <p>Los mejores productos en un solo lugar</p>
      </section>

      {/* CAROUSEL */}
      <section className="mb-5">
        <Carousel>
          {["/img/banner1.jpg", "/img/banner2.jpg", "/img/banner3.jpg"].map(
            (img, i) => (
              <Carousel.Item key={i}>
                <img className="d-block w-100" src={img} alt={`Banner ${i + 1}`} />
              </Carousel.Item>
            )
          )}
        </Carousel>
      </section>

      {/* PRODUCTOS */}
      <section>
        {loading && <p className="text-center">Cargando productos...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <Row>
          {productos.map(producto => (
            <ProductoCard
              key={producto.id}
              producto={producto}
            />
          ))}
        </Row>
      </section>

    </main>
  );
}