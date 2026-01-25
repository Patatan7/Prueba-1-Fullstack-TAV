import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const crearAdminPorDefecto = () => {
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existeAdmin = usuarios.some(u => u.rol === "admin");

    if (!existeAdmin) {
      usuarios.push({
        nombre: "Administrador",
        email: "admin@gmail.com",
        password: "admin123",
        rol: "admin"
      });

      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }
  };

  // Cargar sesión al iniciar
  useEffect(() => {
    crearAdminPorDefecto();

    const usuarioLS = localStorage.getItem("usuarioActivo");
    if (usuarioLS) {
      setUsuario(JSON.parse(usuarioLS));
    }
  }, []);

  const login = (user) => {
    localStorage.setItem("usuarioActivo", JSON.stringify(user));
    setUsuario(user);
  };

  const logout = () => {
    localStorage.removeItem("usuarioActivo");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
