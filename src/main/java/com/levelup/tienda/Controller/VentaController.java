package com.levelup.tienda.Controller;

import com.levelup.tienda.model.Producto;
import com.levelup.tienda.model.Venta;
import com.levelup.tienda.model.VentaDetalle;
import com.levelup.tienda.repository.ProductoRepository;
import com.levelup.tienda.repository.VentaDetalleRepository;
import com.levelup.tienda.repository.VentaRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/ventas")
@CrossOrigin("*")
public class VentaController {

    private final VentaRepository ventaRepo;
    private final VentaDetalleRepository detalleRepo;
    private final ProductoRepository productoRepo;

    public VentaController(
        VentaRepository ventaRepo,
        VentaDetalleRepository detalleRepo,
        ProductoRepository productoRepo
    ) {
        this.ventaRepo = ventaRepo;
        this.detalleRepo = detalleRepo;
        this.productoRepo = productoRepo;
    }

    @PostMapping
    public void registrarVenta(@RequestBody List<VentaDetalle> detalles) {

        int total = 0;

        //Validar Stock
        for (VentaDetalle d : detalles) {
            Producto producto = productoRepo
                    .findById(d.getProductoId())
                    .orElseThrow(() ->
                        new RuntimeException("Producto no encontrado")
                    );

            if (producto.getStock() < d.getCantidad()) {
                throw new RuntimeException(
                    "Stock insuficiente para: " + producto.getNombre()
                );
            }

            total += d.getPrecio() * d.getCantidad();
        }

        //Crear Venta
        Venta venta = new Venta();
        venta.setFecha(LocalDateTime.now());
        venta.setTotal(total);

        Venta ventaGuardada = ventaRepo.save(venta);

        //Guardar detalle y descontar venta
        for (VentaDetalle d : detalles) {

            Producto producto = productoRepo.findById(d.getProductoId()).orElseThrow();

            System.out.println("Stock Actual: " + producto.getStock());

            producto.setStock(
                producto.getStock() - d.getCantidad()
            );

            System.out.println("Stock Nuevo: " + producto.getStock());

            productoRepo.save(producto);

            d.setVentaId(ventaGuardada.getId());
            detalleRepo.save(d);
        }
    }


    @DeleteMapping("/reset")
    public void resetVentas() {
        detalleRepo.deleteAll();
        ventaRepo.deleteAll();
    }

}
