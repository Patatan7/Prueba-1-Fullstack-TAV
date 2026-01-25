import Container from "react-bootstrap/Container";

export default function Historia() {
  return (
    <main className="container my-5">
      {/* ENCABEZADO */}
      <section className="text-center mb-5">
        <h1>Nuestra Historia</h1>
        <p className="text-muted">
          El origen, evolución y proyección de Level-Up
        </p>
      </section>

      {/* CONTENIDO */}
      <section className="row justify-content-center">
        <div className="col-md-8">

          <h4>El comienzo</h4>
          <p>
            <strong>Level-Up</strong> nació a partir de una necesidad concreta:
            encontrar una tienda especializada en productos gamer que ofreciera
            calidad, transparencia y una experiencia de compra simple, sin
            procesos innecesarios ni sobrecostos.
          </p>

          <p>
            La idea surge desde el interés por la tecnología, el comercio digital
            y el mundo gamer, detectando una oportunidad en el mercado para
            centralizar productos confiables en una plataforma moderna y fácil
            de usar.
          </p>

          <h4 className="mt-4">Construcción de la tienda</h4>
          <p>
            En su primera etapa, Level-Up se construyó como una tienda online
            funcional, priorizando la usabilidad y la claridad de la información.
            Se implementó un catálogo de productos, un sistema de carrito de
            compras y una gestión básica de usuarios.
          </p>

          <p>
            A medida que el proyecto fue creciendo, se incorporaron tecnologías
            más robustas, separando el frontend del backend y utilizando una base
            de datos real para la gestión de productos, permitiendo una
            administración más segura y escalable.
          </p>

          <p>
            Actualmente, Level-Up cuenta con un panel de administración, control
            de productos, persistencia de datos y una arquitectura pensada para
            futuras expansiones.
          </p>

          <h4 className="mt-4">Proyección y futuro</h4>
          <p>
            El objetivo de Level-Up es consolidarse como una tienda digital
            confiable, ampliando su catálogo de productos gamer y mejorando
            continuamente la experiencia del usuario.
          </p>

          <p>
            A futuro, se proyecta la incorporación de sistemas de pago en línea,
            control de stock, historial de compras, autenticación avanzada y
            métricas de ventas que permitan tomar decisiones basadas en datos
            reales.
          </p>

          <p className="fw-bold">
            Level-Up representa una base sólida para un proyecto de comercio
            electrónico moderno, escalable y adaptable a las necesidades del
            mercado digital actual.
          </p>

        </div>
      </section>
    </main>
  );
}
