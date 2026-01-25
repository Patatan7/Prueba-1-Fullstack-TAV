package com.levelup.tienda.Controller;

import com.levelup.tienda.model.Producto;
import com.levelup.tienda.repository.ProductoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoRepository repo;

    public ProductoController(ProductoRepository repo) {
        this.repo = repo;
    }

    // Listar producto
    @GetMapping
    public List<Producto> listar() {
        return repo.findAll();
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Integer id) {
        return repo.findById(id).orElse(null);
    }

    // Crear el producto
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        System.out.println("Producto Recibido: " + producto.getNombre());
        return repo.save(producto);
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public Producto actualizar(
        @PathVariable Integer id,
        @RequestBody Producto datos
    ) {
        Producto producto = repo.findById(id).orElse(null);

        if (producto == null) return null;

        producto.setNombre(datos.getNombre());
        producto.setPrecio(datos.getPrecio());
        producto.setImagen(datos.getImagen());
        producto.setDescripcion(datos.getDescripcion());

        System.out.println("Producto Actualizado: " + producto.getNombre() 
        + "\nId: " + producto.getId());
        return repo.save(producto);
    }

    // Eliminar Producto
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        Producto producto = repo.findById(id).orElse(null);
        if (producto != null){
            repo.deleteById(id);
            System.out.println("Producto Eliminado: " + producto.getNombre() 
            + "\nId: " + producto.getId()) ;
        }
        
    }

}
