// ===============================
// UTILIDADES
// ===============================
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function actualizarContadorCarrito() {
  const contador = document.getElementById("cartCount");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contador.textContent = carrito.length;
}

function agregarAlCarrito(index) {
  const productos = obtenerProductos();
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push(productos[index]);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

// ===============================
// DETALLE DEL PRODUCTO
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const indexProducto = params.get("id");

  const productos = obtenerProductos();
  const producto = productos[indexProducto];

  const detalle = document.getElementById("detalleProducto");
  const contenedorOtros = document.getElementById("otrosProductos");

  if (!producto) {
    detalle.innerHTML = "<p>Producto no encontrado</p>";
    return;
  }

  // Render detalle
  detalle.innerHTML = `
    <div class="col-md-6">
      <img src="${producto.imagen}" class="img-fluid producto-img" alt="${producto.nombre}">
    </div>
    <div class="col-md-6">
      <h2>${producto.nombre}</h2>
      <p class="text-muted">
        ${producto.descripcion || "Sin descripción disponible"}
      </p>
      <h4 class="text-success">$${producto.precio}</h4>
      <button class="btn btn-primary mt-3" onclick="agregarAlCarrito(${indexProducto})">
        <i class="bi bi-cart-plus"></i> Añadir al carrito
      </button>
    </div>
  `;

  // Render otros productos
  productos.forEach((p, i) => {
    if (i != indexProducto) {
      contenedorOtros.innerHTML += `
        <div class="col-md-3 mb-4">
          <div class="card h-100">
            <img src="${p.imagen}" class="card-img-top" style="height:150px; object-fit:contain">
            <div class="card-body text-center">
              <h6 class="card-title">${p.nombre}</h6>
              <p class="card-text">$${p.precio}</p>
              <a href="producto-detalle.html?id=${i}" class="btn btn-outline-primary btn-sm">
                Ver detalle
              </a>
            </div>
          </div>
        </div>
      `;
    }
  });

  actualizarContadorCarrito();
});
