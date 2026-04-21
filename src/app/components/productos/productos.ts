import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CartService } from '../../services/cart.service';
import { debounceTime, distinctUntilChanged } from 'rxjs'; // Para optimizar la búsqueda

interface ProductoVisual extends Producto {
  imagenUrl?: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponent implements OnInit {

  @Input() limit: number = 0;
  
  // Lista que se muestra en el HTML (respeta el límite si existe)
  get listaFiltrada() {
    return this.limit > 0 ? this.productos().slice(0, this.limit) : this.productos();
  }
  
  productos = signal<ProductoVisual[]>([]);

  private fotosCatalogo = [
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1539109132381-31a1ec6ce7a2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1485230895905-ec17ba36b5bc?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1529139513477-3235a1191e21?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=800&auto=format&fit=crop'
  ];

  constructor(
    private service: ProductoService,
    public cartService: CartService 
  ) { }

  ngOnInit(): void {
    // 1. Carga inicial de todos los productos
    this.cargarTodosLosProductos();

    // 2. Suscribirse al canal de búsqueda del Navbar
    this.service.search$.pipe(
      debounceTime(300),        // Espera a que el usuario deje de teclear
      distinctUntilChanged()    // Solo busca si el texto cambió
    ).subscribe({
      next: (termino) => {
        if (termino.trim().length > 0) {
          // Si hay texto, buscamos en el backend filtrando
          this.buscarProductos(termino);
        } else {
          // Si borra el buscador, cargamos todo de nuevo
          this.cargarTodosLosProductos();
        }
      }
    });
  }

  // Método para cargar la lista completa
  private cargarTodosLosProductos() {
    this.service.getProductos().subscribe({
      next: (prods) => this.mapearFotos(prods),
      error: (err) => console.error("Error al traer datos de Java", err)
    });
  }

  // Método para buscar por término
  private buscarProductos(termino: string) {
    this.service.buscarPorNombre(termino).subscribe({
      next: (prods) => this.mapearFotos(prods),
      error: (err) => console.error("Error en la búsqueda", err)
    });
  }

  // Lógica común para asignar las fotos del catálogo
  private mapearFotos(prods: Producto[]) {
    const prodsConFotos = prods.map((p, index) => ({
      ...p,
      imagenUrl: this.fotosCatalogo[index % this.fotosCatalogo.length]
    }));
    this.productos.set(prodsConFotos);
  }

  agregarAlCarrito(producto: any) {
    this.cartService.agregarProducto(producto);
    console.log('Producto en carrito:', this.cartService.items());
  }
}