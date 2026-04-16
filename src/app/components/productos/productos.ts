import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';
import { CartService } from '../../services/cart.service'; // <--- NUEVO IMPORT

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
  get listaFiltrada(){
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
    public cartService: CartService // <--- INYECTAMOS EL CARRITO
  ) { }

  ngOnInit(): void {
    this.service.getProductos().subscribe({
      next: (prods) => {
        const prodsConFotos = prods.map((p, index) => ({
          ...p,
          imagenUrl: this.fotosCatalogo[index % this.fotosCatalogo.length]
        }));
        this.productos.set(prodsConFotos);
      },
      error: (err) => console.error("Error al traer datos de Java", err)
    });
  }

  // AHORA ESTA FUNCIÓN NO LLAMA A JAVA
  agregarAlCarrito(producto: any) {
    this.cartService.agregarProducto(producto);
    console.log('Producto en memoria:', this.cartService.items());
  }
}