import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductosComponent } from '../productos/productos';

@Component({
  selector: 'app-home',
  standalone: true, // ¡Asegúrate de que esto esté aquí!
  imports: [ProductosComponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent { // Cambiamos 'Home' por 'HomeComponent' para ser consistentes
}