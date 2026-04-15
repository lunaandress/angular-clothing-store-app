import { AfterViewInit, Component, inject, signal } from '@angular/core'; // Añadimos inject
import { CarritoComponent } from "./components/carrito/carrito";
import { ProductosComponent } from './components/productos/productos';
import { CartService } from './services/cart.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductosComponent, CarritoComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  ngAfterViewInit() {
    // Busca todos los videos y dales "play" manualmente por si acaso
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.log("El autoplay fue bloqueado, pero está listo:", error));
    });
  }
  protected readonly title = signal('tienda-ropa-app');

  // 1. Inyectamos el servicio
  // 2. Lo ponemos como 'public' para que el HTML lo vea
  public cartService = inject(CartService);

 // Dentro de tu clase AppComponent
isCartOpen = false;

toggleCart() {
  this.isCartOpen = !this.isCartOpen;
}
}