// OBTENER CARRITO
export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

// AGREGAR AL CARRITO
export function agregarAlCarrito(indexProducto) {
  const productos = JSON.parse(localStorage.getItem("productos")) || [];
  let carrito = obtenerCarrito();

  if (!productos[indexProducto]) return;

  carrito.push(productos[indexProducto]);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ELIMINAR PRODUCTO
export function eliminarProducto(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// VACIAR CARRITO
export function vaciarCarrito() {
  localStorage.removeItem("carrito");
}
