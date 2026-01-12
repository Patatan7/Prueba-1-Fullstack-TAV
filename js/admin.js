document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuario || usuario.rol !== "admin") {
    alert("Acceso restringido");
    window.location.href = "index.html";
  }
});

const form = document.getElementById("productoForm");
const tbody = document.getElementById("productosAdmin");

function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function renderProductos() {
  const productos = obtenerProductos();
  tbody.innerHTML = "";

  productos.forEach((p, index) => {
    tbody.innerHTML += `
      <tr>
        <td>${p.nombre}</td>
        <td>$${p.precio}</td>
        <td>
          ${p.imagen ? `<img src="${p.imagen}" width="50">` : "Sin imagen"}
        </td>
        <td>${p.descripcion || "Sin descripción"}</td>
        <td class="text-center">
          <button class="btn btn-warning btn-sm" onclick="editarProducto(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = document.getElementById("prodDescripcion").value.trim();
  const nombre = document.getElementById("prodNombre").value.trim();
  const precio = Number(document.getElementById("prodPrecio").value);
  const imagen = document.getElementById("prodImagen").value.trim();
  const index = document.getElementById("productoIndex").value;

  let productos = obtenerProductos();

  if (index === "") {
    productos.push({ nombre, precio, imagen, descripcion });
  } else {
    productos[index] = { nombre, precio, imagen, descripcion };
  }

  guardarProductos(productos);
  form.reset();
  document.getElementById("productoIndex").value = "";
  renderProductos();
});

function editarProducto(index) {
  const producto = obtenerProductos()[index];
  document.getElementById("prodNombre").value = producto.nombre;
  document.getElementById("prodPrecio").value = producto.precio;
  document.getElementById("prodImagen").value = producto.imagen;
  document.getElementById("prodDescripcion").value = producto.descripcion || "";
  document.getElementById("productoIndex").value = index;
}

function eliminarProducto(index) {
  let productos = obtenerProductos();
  productos.splice(index, 1);
  guardarProductos(productos);
  renderProductos();
}

document.addEventListener("DOMContentLoaded", renderProductos);