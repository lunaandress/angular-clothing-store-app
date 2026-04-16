import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  onLogin(event: Event) {
    event.preventDefault();
    console.log("Intentando iniciar sesión...");
    // Aquí conectaremos con el servicio de autenticación más adelante
  }
}
