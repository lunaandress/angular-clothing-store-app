import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necesario para el [(ngModel)]
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule], // Añadimos FormsModule aquí
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  // Inyectamos las herramientas necesarias
  private authService = inject(AuthService);
  private router = inject(Router);

  // Objeto para vincular con el formulario HTML
  // Nota: Usamos 'username' porque es lo que espera tu JwtAuthenticationFilter
  loginData = {
    username: '',
    password: ''
  };

  onLogin(event: Event) {
    event.preventDefault();
    
    console.log("Enviando credenciales a Spring Boot...", this.loginData);

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log("Respuesta del servidor:", response.mensaje);
        // Si todo sale bien, volvemos a la Home
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error("Error en el login:", err);
        alert("Credenciales incorrectas. Revisa tu usuario y contraseña.");
      }
    });
  }
}