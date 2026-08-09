import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core'; // 1. Añadimos Output y EventEmitter
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

  // 2. Definimos la salida para avisar al padre que debe cerrar
  @Output() closeCart = new EventEmitter<void>();

  constructor(
    public cartService: CartService,
    private productoService: ProductoService
  ) {}

  // 3. Función que dispara el evento de cierre
  cerrarCarrito() {
    this.closeCart.emit();
  }

  enviarPedidoFinal() {
    const listaProductos = this.cartService.items();
    
    if (listaProductos.length === 0) return;

    const pedidoCompleto = {
      descripcion: `Compra de ${listaProductos.length} artículos en STYLES®`,
      items: listaProductos.map(item => ({
        cantidad: item.cantidad,
        producto: { id: item.idProducto }
      }))
    };

    this.productoService.crearPedido(pedidoCompleto).subscribe({
      next: (res) => {
        console.log('¡Pedido agrupado guardado con éxito!', res);
        alert('¡Pedido enviado con éxito!');
        this.cartService.limpiarCarrito();
        this.cerrarCarrito(); // Opcional: cerramos el carrito tras la compra
      },
      error: (err) => {
        console.error('Error al guardar el pedido completo:', err);
        alert('Hubo un error al procesar la compra.');
      }
    });
  }
  
  eliminar(id: number) {
    this.cartService.eliminarProducto(id);
  }

  calcularTotal(): number {
    return this.cartService.items().reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }
}