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

  private productoService = inject(ProductoService); // Inyecta el servicio de productos
  onSearch(termino: string) {
      // Enviamos el término al servicio para que otros lo escuchen
      this.productoService.enviarTerminoBusqueda(termino);
    }
  
  // Inyecciones
  public cartService = inject(CartService);
  public authService = inject(AuthService); // Inyectamos el AuthService real
  private router = inject(Router);

  // Estados
  protected readonly title = signal('tienda-ropa-app');
  isCartOpen = false;
  isUserMenuOpen = false; // Variable para el menú de usuario

  ngAfterViewInit() {
    // Lógica de videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.muted = true;
      video.play().catch(error => console.log("Autoplay listo", error));
    });

    // Desaparición del preloader
    this.ocultarPreloader();
  }

  // Lógica del menú de usuario
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout(); // Limpia el localStorage y el signal
    this.isUserMenuOpen = false; // Cierra el menú
    this.router.navigate(['/login']); // Redirige al login al salir
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
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