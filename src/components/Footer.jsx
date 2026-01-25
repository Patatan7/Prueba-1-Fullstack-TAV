import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  //Oculta el Footer en:
  const ocultar = ["/admin", "/login", "/registro"].includes(location.pathname);
  //If para que lo realice
  if (ocultar) return null;

  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <small>© 2026 Level-Up — Todos los derechos reservados</small>
    </footer>
  );
}
