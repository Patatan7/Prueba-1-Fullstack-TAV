package com.levelup.tienda.model;

import jakarta.persistence.*;

@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private Double precio;
    private String imagen;

    @Column(length = 500)
    private String descripcion;

    // getters y setters
}
