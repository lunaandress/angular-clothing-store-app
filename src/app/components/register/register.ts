  import { Component, inject } from '@angular/core';
  import { RouterLink, Router } from '@angular/router';
  import { FormsModule } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';

  @Component({
    selector: 'app-register',
    standalone: true,
    imports: [RouterLink, FormsModule],
    templateUrl: './register.html',
    styleUrl: '../login/login.css' // Reutilizamos los estilos del login
  })
  export class RegisterComponent {
    private http = inject(HttpClient);
    private router = inject(Router);

    registerData = {
      username: '',
      email: '',
      password: '',
      enabled: true // Importante para que Spring Boot lo deje entrar
    };
errors: any;

    onRegister(event: Event) {
      event.preventDefault();
      
      // Llamamos a tu endpoint de Spring Boot que vimos antes
      const url = 'http://localhost:8080/api/usuarios/registro';

      this.http.post(url, this.registerData).subscribe({
        next: (res) => {
          alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error("Error en el registro", err);
          alert("Hubo un problema al crear la cuenta. ¿Quizás el email ya existe?");
        }
      });
    }
  }