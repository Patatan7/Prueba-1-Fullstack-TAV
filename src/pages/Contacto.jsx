import { useState } from "react";

export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const expCorreo = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    let errores = "";
    let valido = true;

    if (!nombre || nombre.length > 100) {
      errores += "El nombre es obligatorio y debe tener máximo 100 caracteres.<br>";
      valido = false;
    }

    if (email) {
      if (email.length > 100 || !expCorreo.test(email)) {
        errores += "Correo inválido.<br>";
        valido = false;
      }
    }

    if (!comentario || comentario.length > 500) {
      errores += "El comentario es obligatorio y debe tener máximo 500 caracteres.<br>";
      valido = false;
    }

    if (!valido) {
      setMensaje(errores);
      setTipoMensaje("danger");
      return;
    }

    const mensajes = JSON.parse(localStorage.getItem("mensajesContacto")) || [];

    mensajes.push({
      nombre,
      email,
      comentario,
      fecha: new Date().toLocaleString()
    });

    localStorage.setItem("mensajesContacto", JSON.stringify(mensajes));

    setMensaje("Mensaje enviado correctamente");
    setTipoMensaje("success");

    setNombre("");
    setEmail("");
    setComentario("");
  };

  return (
    <>
      {/* MAIN */}
      <main className="container mt-5">
        <section className="row justify-content-center">
          <article className="col-md-8">

            <h2 className="text-center mb-4">Contacto</h2>

            <form onSubmit={handleSubmit} noValidate>

              <div className="mb-3">
                <label className="form-label">Nombre *</label>
                <input
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
                <label className="form-label">Comentario *</label>
                <textarea
                  className="form-control"
                  rows="5"
                  value={comentario}
                  onChange={e => setComentario(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100">
                Enviar mensaje
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
