export function crearAdminPorDefecto() {
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
    console.log("ADMIN CREADO CORRECTAMENTE");
  }
}
