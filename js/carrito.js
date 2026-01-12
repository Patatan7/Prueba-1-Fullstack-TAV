function agregarAlCarrito(indexProducto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (!productos[indexProducto]) return;

  carrito.push(productos[indexProducto]);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito();
}

// CONTADOR DEL CARRITO
function actualizarContadorCarrito() {
  const contador = document.getElementById("cartCount");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  contador.textContent = carrito.length;
}

// CARGAR CARRITO (carrito.html)
function cargarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoBody = document.getElementById("carritoBody");
  const totalCarrito = document.getElementById("totalCarrito");
  const carritoVacio = document.getElementById("carritoVacio");
  const btnComprar = document.getElementById("btnComprar");

  if (!carritoBody) return;

  carritoBody.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    carritoVacio.classList.remove("d-none");
    btnComprar.disabled = true;
    totalCarrito.textContent = 0;
    return;
  }

  carritoVacio.classList.add("d-none");
  btnComprar.disabled = false;

  carrito.forEach((producto, index) => {
    total += producto.precio;

    carritoBody.innerHTML += `
      <tr>
        <td><strong>${producto.nombre}</strong></td>
        <td>$${producto.precio}</td>
        <td class="text-center">
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  totalCarrito.textContent = total;
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  cargarCarrito();
  actualizarContadorCarrito();
}

// COMPRAR
document.addEventListener("DOMContentLoaded", () => {
  const btnComprar = document.getElementById("btnComprar");

  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      alert("Compra realizada con éxito");
      localStorage.removeItem("carrito");
      cargarCarrito();
      actualizarContadorCarrito();
    });
  }

  cargarCarrito();
  actualizarContadorCarrito();
});
