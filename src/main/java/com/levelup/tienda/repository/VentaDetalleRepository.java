package com.levelup.tienda.repository;

import com.levelup.tienda.model.VentaDetalle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VentaDetalleRepository extends JpaRepository<VentaDetalle, Integer> {

    @Query("""
      SELECT vd.productoId
      FROM VentaDetalle vd
      GROUP BY vd.productoId
      ORDER BY SUM(vd.cantidad) DESC
      LIMIT 1
    """)
    Integer productoMasVendido();
}
