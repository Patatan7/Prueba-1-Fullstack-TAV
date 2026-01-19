import { describe, it, expect } from "vitest";
import {
  agregarProducto,
  eliminarProducto,
  calcularTotal
} from "../src/utils/carritoUtils";

describe("Funciones del carrito", () => {

  const producto1 = { nombre: "Mouse", precio: 10000 };
  const producto2 = { nombre: "Teclado", precio: 20000 };

  it("Agrega un producto al carrito", () => {
    const carrito = [];
    const resultado = agregarProducto(carrito, producto1);

    expect(resultado.length).toBe(1);
    expect(resultado[0]).toEqual(producto1);
  });

  it("Elimina un producto del carrito", () => {
    const carrito = [producto1, producto2];
    const resultado = eliminarProducto(carrito, 0);

    expect(resultado.length).toBe(1);
    expect(resultado[0]).toEqual(producto2);
  });

  it("Calcula el total del carrito", () => {
    const carrito = [producto1, producto2];
    const total = calcularTotal(carrito);

    expect(total).toBe(30000);
  });

  it("Carrito vacío retorna total 0", () => {
    const carrito = [];
    const total = calcularTotal(carrito);

    expect(total).toBe(0);
  });

});
