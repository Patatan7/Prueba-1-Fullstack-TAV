const API_URL = "http://localhost:8080/api/productos";

export async function obtenerProductos() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
}

export async function crearProducto(producto) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al crear producto");
  }

  return res.json();
}

export async function actualizarProducto(id, producto) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(producto),
  });

  if (!res.ok) {
    throw new Error("Error al actualizar producto");
  }

  return res.json();
}

export async function eliminarProducto(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
}