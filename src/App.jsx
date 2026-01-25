import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Contacto from "./pages/Contacto";
import Carrito from "./pages/Carrito";
import ProductoDetalle from "./pages/ProductoDetalle";
import Admin from "./pages/Admin";
import Historia from "./pages/Historia"

// Componentes globales
import NavbarApp from "./components/Navbar";
import FloatingCart from "./components/FloatingCart";
import Footer from "./components/Footer"

// CSS global
import "./css/styles.css";

function App() {
  return (
    <BrowserRouter>
      <NavbarApp />
      <FloatingCart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/historia" element={<Historia />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
