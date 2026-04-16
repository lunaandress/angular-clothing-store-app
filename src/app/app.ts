import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CarritoComponent } from "./components/carrito/carrito";
import { RouterOutlet, RouterLink } from '@angular/router';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarritoComponent, RouterLink, RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {

  ngAfterViewInit() {
    // 1. Lógica de videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.log("Autoplay listo", error));
    });

    // 2. Ejecutar la desaparición del preloader
    this.ocultarPreloader();
  }

  // Nueva función para quitar el logo giratorio
  private ocultarPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      // Le damos 1.5 segundos para que el usuario vea el logo girar con clase
      setTimeout(() => {
        preloader.classList.add('fade-out');
        
        // Lo borramos del código después de que termine la transición de 0.6s
        setTimeout(() => preloader.remove(), 400);
      }, 1500);
    }
  }

  protected readonly title = signal('tienda-ropa-app');
  public cartService = inject(CartService);
  isCartOpen = false;

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }
}