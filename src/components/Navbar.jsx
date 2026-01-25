import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function NavbarApp() {
  const { usuario, logout } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
        <img
            src="/img/logo-tienda.png"
            alt="Level-Up"
            height="32"
            className="d-inline-block align-top"
        />
          <span className="fw-bold text-white">
            Level-Up
          </span>
        </Navbar.Brand>


        <Nav className="ms-auto align-items-center gap-2">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          <Nav.Link as={Link} to="/historia">Sobre nosotros</Nav.Link>

          <span className="nav-divider">|</span>

          {usuario ? (
            <>
              <Navbar.Text className="text-white me-2">
                Hola, {usuario.nombre}
              </Navbar.Text>

              {usuario.rol === "admin" && (
                <Button
                  as={Link}
                  to="/admin"
                  variant="success"
                  size="sm"
                >
                  Admininstración
                </Button>
              )}

              <Button
                variant="danger"
                size="sm"
                onClick={logout}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button
                as={Link}
                to="/login"
                variant="outline-light"
                size="sm"
              >
                Login
              </Button>

              <Button
                as={Link}
                to="/registro"
                variant="outline-light"
                size="sm"
              >
                Registro
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}