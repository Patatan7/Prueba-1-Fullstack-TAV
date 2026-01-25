import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import ProductoCard from "../components/ProductoCard";
import { obtenerProductos } from "../data/productosApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch(console.error)
  }, [])

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
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/banner1.jpg"
              alt="Banner 1"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/banner2.jpg"
              alt="Banner 2"
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/banner3.jpg"
              alt="Banner 3"
            />
          </Carousel.Item>
        </Carousel>
      </section>

      {/* PRODUCTOS */}
      <section>
        <Row>
          {productos.map((producto, index) => (
            <ProductoCard
              key={index}
              producto={producto}
              index={index}
            />
          ))}
        </Row>
      </section>

    </main>
  );
}
