import { useState } from "react";

export default function Registro() {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let errores = "";
    let valido = true;

    const expCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

    if (nombre.trim().length < 6) {
      errores += "El nombre debe tener al menos 6 caracteres.<br>";
      valido = false;
    }

    if (!expCorreo.test(email.trim())) {
      errores += "Correo no válido.<br>";
      valido = false;
    }

    if (password.trim().length < 4 || password.trim().length > 10) {
      errores += "La contraseña debe tener entre 4 y 10 caracteres.<br>";
      valido = false;
    }

    if (!valido) {
      setMensaje(errores);
      setTipoMensaje("danger");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find(u => u.email === email);
    if (existe) {
      setMensaje("El correo ya está registrado.");
      setTipoMensaje("danger");
      return;
    }

    const nuevoUsuario = {
      nombre: nombre.trim(),
      email: email.trim(),
      password: password.trim(),
      rol: "cliente"
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    setMensaje("Registro exitoso");
    setTipoMensaje("success");

    setNombre("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {/* MAIN */}
      <main className="container mt-5">
        <section className="row justify-content-center">
          <article className="col-md-6">

            <h2 className="text-center mb-4">Registro de Usuario</h2>

            <form onSubmit={handleSubmit} noValidate>

              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100">
                Registrarse
              </button>

              {mensaje && (
                <div
                  className={`alert alert-${tipoMensaje} mt-3`}
                  dangerouslySetInnerHTML={{ __html: mensaje }}
                />
              )}

            </form>

          </article>
        </section>
      </main>
    </>
  );
}
