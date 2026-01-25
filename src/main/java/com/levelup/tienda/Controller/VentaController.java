package com.levelup.tienda.Controller;

import com.levelup.tienda.model.Venta;
import com.levelup.tienda.model.VentaDetalle;
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

    public VentaController(
        VentaRepository ventaRepo,
        VentaDetalleRepository detalleRepo
    ) {
        this.ventaRepo = ventaRepo;
        this.detalleRepo = detalleRepo;
    }

    @PostMapping
    public void registrarVenta(@RequestBody List<VentaDetalle> detalles) {

        int total = detalles.stream()
                .mapToInt(d -> d.getPrecio() * d.getCantidad())
                .sum();

        // Crear venta
        Venta venta = new Venta();
        venta.setFecha(LocalDateTime.now());
        venta.setTotal(total);

        Venta ventaGuardada = ventaRepo.save(venta);

        // Guardar detalle
        for (VentaDetalle d : detalles) {
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
