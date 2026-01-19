const productosBase = [
  {
    nombre: "Mouse Gamer",
    precio: 15990,
    imagen: "/img/productos/g502.jpg",
    descripcion: "Mouse gamer profesional"
  },
  {
    nombre: "Teclado Mecánico",
    precio: 45990,
    imagen: "/img/productos/k552.jpg",
    descripcion: "Teclado mecánico RGB"
  },
  {
    nombre: "Audífonos Gamer",
    precio: 29990,
    imagen: "/img/productos/g935.jpg",
    descripcion: "Audífonos gamer envolventes"
  }
];

export function obtenerProductos() {
  const productosLS = JSON.parse(localStorage.getItem("productos"));

  if (!productosLS || productosLS.length === 0) {
    localStorage.setItem("productos", JSON.stringify(productosBase));
    return productosBase;
  }

  return productosLS;
}
