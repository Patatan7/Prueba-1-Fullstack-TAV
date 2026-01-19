import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Cargar sesión al iniciar
  useEffect(() => {
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
