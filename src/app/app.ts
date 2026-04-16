import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CarritoComponent } from "./components/carrito/carrito";
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // IMPORTANTE: Quitamos ProductosComponent de aquí porque se carga vía rutas
  imports: [CarritoComponent, RouterLink, RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  ngAfterViewInit() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.log("Autoplay listo", error));
    });
  }

  protected readonly title = signal('tienda-ropa-app');
  public cartService = inject(CartService);
  isCartOpen = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}