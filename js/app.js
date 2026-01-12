const productosBase = [
  {
    nombre: "Mouse Gamer",
    precio: 15990,
    imagen: "assets/img/productos/g502.jpg"
  },
  {
    nombre: "Teclado Mecánico",
    precio: 45990,
    imagen: "assets/img/productos/k552.jpg"
  },
  {
    nombre: "Audífonos Gamer",
    precio: 29990,
    imagen: "assets/img/productos/g935.jpg"
  }
];

// INICIALIZADORES
crearAdminPorDefecto();
inicializarProductos();

// RENDER PRODUCTOS EN INDEX
const contenedor = document.getElementById("productos-home");

if (contenedor) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];

  productos.forEach((producto, index) => {
  contenedor.innerHTML += `
    <article class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height:200px; object-fit:contain">
        <div class="card-body text-center">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio}</p>

          <div class="d-grid gap-2">
            <a href="producto-detalle.html?id=${index}" class="btn btn-outline-secondary btn-sm">
              Ver detalle
            </a>
            <button class="btn btn-primary btn-sm" onclick="agregarAlCarrito(${index})">
              Añadir al carrito
            </button>
          </div>

        </div>
      </div>
    </article>
  `;
});
}

// CARRITO
function actualizarContadorCarrito() {
  const contador = document.getElementById("cartCount");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contador.textContent = carrito.length;
}

// NAVBAR / SESIÓN
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();

  const navAuth = document.getElementById("navAuth");
  if (!navAuth) return;

  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (usuario) {
    let botonAdmin = "";

    if (usuario.rol === "admin") {
      botonAdmin = `
        <a href="admin.html" class="btn btn-warning btn-sm">
          Admin
        </a>
      `;
    }

    navAuth.innerHTML = `
      <span class="navbar-text text-white me-2">
        Hola, ${usuario.nombre}
      </span>
      ${botonAdmin}
      <button class="btn btn-outline-light btn-sm" id="logoutBtn">
        Cerrar sesión
      </button>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioActivo");
      location.reload();
    });
  } else {
    navAuth.innerHTML = `
      <a href="login.html" class="btn btn-outline-light btn-sm">Login</a>
      <a href="registro.html" class="btn btn-outline-light btn-sm">Registro</a>
    `;
  }
});


// ADMIN POR DEFECTO
function crearAdminPorDefecto() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const existeAdmin = usuarios.some(u => u.rol === "admin");

  if (!existeAdmin) {
    const admin = {
      nombre: "Administrador",
      email: "admin@gmail.com",
      password: "admin123",
      rol: "admin"
    };

    usuarios.push(admin);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    console.log("%cADMIN CREADO CORRECTAMENTE", "color: green; font-weight: bold;");
  }
}

function inicializarProductos() {
  const productosLS = JSON.parse(localStorage.getItem("productos"));

  if (!productosLS || productosLS.length === 0) {
    localStorage.setItem("productos", JSON.stringify(productosBase));
    console.log("%cPRODUCTOS BASE CARGADOS", "color: blue; font-weight: bold;");
  }
}
