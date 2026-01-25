import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { formatoCLP } from "../utils/formatoMoneda";

export default function ProductoCard({ producto, index }) {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <Col md={4} className="mb-4">
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={producto.imagen || "/img/no-image.png"}
          onError={(e) => {
            e.target.src = "/img/no-image.png"
          }}
          style={{ height: "200px", objectFit: "contain" }}
        />

        <Card.Body className="text-center">
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Text>{formatoCLP(producto.precio)}</Card.Text>

          <div className="d-grid gap-2">
            <Link
              to={`/producto/${producto.id}`}
              className="btn btn-outline-secondary btn-sm"
            >
              Ver detalle
            </Link>

            <Button size="sm" onClick={() => agregarAlCarrito(producto)}>
              Añadir al carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}
