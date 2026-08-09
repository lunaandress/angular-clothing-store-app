import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { CarritoComponent } from "./components/carrito/carrito";
import { RouterOutlet, RouterLink, Router } from '@angular/router'; 
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { ProductoService } from './services/producto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarritoComponent, RouterLink, RouterOutlet], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  private productoService = inject(ProductoService);
  public cartService = inject(CartService);
  public authService = inject(AuthService);
  private router = inject(Router);

  protected readonly title = signal('tienda-ropa-app');
  isCartOpen = false; // Estado del carrito
  isUserMenuOpen = false;

  onSearch(termino: string) {
    this.productoService.enviarTerminoBusqueda(termino);
  }

  ngAfterViewInit() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.log("Autoplay listo", error));
    });
    this.ocultarPreloader();
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.isUserMenuOpen = false;
    this.router.navigate(['/login']);
  }

  // Abre o cierra (para el icono de la bolsa)
  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  // Fuerza el cierre (para la X del carrito)
  closeCart() {
    this.isCartOpen = false;
  }

  private ocultarPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => preloader.remove(), 400);
      }, 1500);
    }
  }
}