import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

export default function NavbarApp() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuarioActivo"));
    setUsuario(u);
  }, []);

  const logout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Level-Up</Navbar.Brand>

        <Nav className="ms-auto gap-2">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>

          {usuario ? (
            <>
              <Navbar.Text className="text-white me-2">
                Hola, {usuario.nombre}
              </Navbar.Text>

              {usuario.rol === "admin" && (
                <Button
                  as={Link}
                  to="/admin"
                  variant="warning"
                  size="sm"
                >
                  Admin
                </Button>
              )}

              <Button
                variant="outline-light"
                size="sm"
                onClick={logout}
              >
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Button className="btn btn-outline-light btn-sm"
                as={Link}
                to="/login"
                variant="outline-light"
                size="sm"
              >
                Login
              </Button>

              <Button className="btn btn-outline-light btn-sm"
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
