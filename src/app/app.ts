import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { ProductosComponet } from './components/productos/productos';

@Component({
  selector: 'app-root',
  imports: [ProductosComponet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tienda-ropa-app');
}
