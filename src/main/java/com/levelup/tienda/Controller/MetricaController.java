package com.levelup.tienda.Controller;

import com.levelup.tienda.model.Producto;
import com.levelup.tienda.repository.ProductoRepository;
import com.levelup.tienda.repository.VentaDetalleRepository;
import com.levelup.tienda.repository.VentaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/metricas")
@CrossOrigin("*")
public class MetricaController {

    private final VentaRepository ventaRepo;
    private final VentaDetalleRepository detalleRepo;
    private final ProductoRepository productoRepo;

    public MetricaController(
        VentaRepository ventaRepo,
        VentaDetalleRepository detalleRepo,
        ProductoRepository productoRepo
    ) {
        this.ventaRepo = ventaRepo;
        this.detalleRepo = detalleRepo;
        this.productoRepo = productoRepo;
    }

    @GetMapping
    public Map<String, Object> obtenerMetricas() {
        Map<String, Object> data = new HashMap<>();

        Integer totalMes = ventaRepo.totalDelMes();
        Integer productoId = detalleRepo.productoMasVendido();

        Producto producto = productoId != null
                ? productoRepo.findById(productoId).orElse(null)
                : null;

        data.put("totalMes", totalMes != null ? totalMes : 0);
        data.put("productoTop", producto);

        return data;
    }
}
