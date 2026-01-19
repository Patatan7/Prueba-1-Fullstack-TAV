export function agregarProducto(carrito, producto) {
  return [...carrito, producto];
}

export function eliminarProducto(carrito, index) {
  return carrito.filter((_, i) => i !== index);
}

export function calcularTotal(carrito) {
  return carrito.reduce((total, p) => total + p.precio, 0);
}
