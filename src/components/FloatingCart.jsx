import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";
import "../css/styles.css";

export default function FloatingCart() {
  const { carrito } = useContext(CarritoContext);
  const location = useLocation();

  //Oculta el Carrito flotante en:
  const ocultar = ["/carrito", "/login", "/registro", "/admin", "/contacto"].includes(location.pathname);
  //If para que lo realice
  if (ocultar) return null;

  return (
    <Link to="/carrito" id="floatingCart">
      <i className="bi bi-cart3"></i>

      {carrito.length > 0 && (
        <span>{carrito.length}</span>
      )}
    </Link>
  );
}
