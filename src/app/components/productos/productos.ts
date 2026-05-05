import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Producto } from '../../models/producto';
import { CartService } from '../../services/cart.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent implements OnInit {

  @Input() limit: number = 0;
  
  productos = signal<Producto[]>([]);

  // Getter para la lista que se muestra en el HTML
  get listaFiltrada() {
    return this.limit > 0 ? this.productos().slice(0, this.limit) : this.productos();
  }

  constructor(
    private service: ProductoService,
    public cartService: CartService 
  ) { }

  ngOnInit(): void {
    // 1. Carga inicial
    this.cargarTodosLosProductos();

    // 2. Suscripción al buscador
    this.service.search$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe({
      next: (termino) => {
        if (termino.trim().length > 0) {
          this.buscarProductos(termino);
        } else {
          this.cargarTodosLosProductos();
        }
      }
    });
  }

  private cargarTodosLosProductos() {
    this.service.getProductos().subscribe({
      next: (prods) => this.productos.set(prods), // Ahora guardamos los productos tal cual vienen
      error: (err) => console.error("Error al traer datos de Java", err)
    });
  }

  private buscarProductos(termino: string) {
    this.service.buscarPorNombre(termino).subscribe({
      next: (prods) => this.productos.set(prods),
      error: (err) => console.error("Error en la búsqueda", err)
    });
  }

  agregarAlCarrito(producto: Producto) {
    this.cartService.agregarProducto(producto);
    console.log('Producto en carrito:', this.cartService.items());
  }
}