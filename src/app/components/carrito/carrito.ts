import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class CarritoComponent {

  constructor(
    public cartService: CartService,
    private productoService: ProductoService
  ) {}

  enviarPedidoFinal() {
    const items = this.cartService.items();
    
    if (items.length === 0) return;

    // Recorremos los productos del carrito y los enviamos uno a uno a la BD
    items.forEach(item => {
      const pedido = {
        descripcion: `Compra de: ${item.nombre}`,
        cantidad: item.cantidad,
        producto: { id: item.idProducto }
      };

      this.productoService.crearPedido(pedido).subscribe({
        next: (res) => console.log('Guardado en Java:', res),
        error: (err) => console.error('Error al guardar:', err)
      });
    });

    alert('¡Pedido enviado con éxito a la base de datos!');
    this.cartService.limpiarCarrito();
  }
  
  eliminar(id: number) {
  this.cartService.eliminarProducto(id);
}

calcularTotal(): number {
  return this.cartService.items().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

  
}