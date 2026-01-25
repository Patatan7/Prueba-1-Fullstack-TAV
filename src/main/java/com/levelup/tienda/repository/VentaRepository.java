package com.levelup.tienda.repository;

import com.levelup.tienda.model.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VentaRepository extends JpaRepository<Venta, Integer> {

    @Query("""
      SELECT SUM(v.total)
      FROM Venta v
      WHERE MONTH(v.fecha) = MONTH(CURRENT_DATE)
        AND YEAR(v.fecha) = YEAR(CURRENT_DATE)
    """)
    Integer totalDelMes();
}
