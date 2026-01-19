import { useEffect, useState } from "react";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

  // CARGAR CARRITO
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  // CALCULAR TOTAL
  useEffect(() => {
    const suma = carrito.reduce((acc, p) => acc + p.precio, 0);
    setTotal(suma);
  }, [carrito]);

  // ELIMINAR PRODUCTO
  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  };

  // COMPRAR
  const finalizarCompra = () => {
    if (!usuario) {
      alert("Debes iniciar sesión para finalizar la compra");
      return;
    }

    alert("Compra realizada con éxito");
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  return (
    <>
      {/* MAIN */}
      <main className="container my-5">
        <section>
          <h2 className="mb-4">Carrito de Compras</h2>

          {carrito.length === 0 && (
            <div className="alert alert-info">
              Tu carrito está vacío.
            </div>
          )}

          {carrito.length > 0 && (
            <>
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th className="text-center">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((producto, index) => (
                      <tr key={index}>
                        <td>
                          <strong>{producto.nombre}</strong>
                        </td>
                        <td>${producto.precio}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => eliminarProducto(index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-end mt-4">
                <h4>Total: ${total}</h4>
                <button
                  className="btn btn-success mt-2"
                  onClick={finalizarCompra}
                >
                  Finalizar compra
                </button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
