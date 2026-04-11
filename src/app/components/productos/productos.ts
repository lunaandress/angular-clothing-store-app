import { CommonModule } from '@angular/common'; // <--- Cambiamos esto
import { Component, OnInit, signal } from '@angular/core';
import { Producto } from '../../models/producto';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  standalone: true, // Asegúrate de que tenga esto
  imports: [CommonModule], // <--- Aquí usamos CommonModule
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class ProductosComponet implements OnInit {
  // Aquí guardaremos los productos que vengan de Java
  // En lugar de un array normal, usamos un Signal
    productos = signal<Producto[]>([]);

  // Inyectamos el servicio en el constructor (Correcto)
  constructor(private service: ProductoService) { }

ngOnInit(): void {
    // Llamamos al servicio
    this.service.getProductos().subscribe({
      next: (prods) => {
        console.log("Asignando datos a la variable...", prods);
        this.productos.set(prods); // <--- Aquí es donde se guardan
      },
      error: (err) => {
        console.error("Error al traer datos de Java", err);
      }
    });
  }
}