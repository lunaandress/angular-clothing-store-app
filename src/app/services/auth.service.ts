    import { Injectable, inject, signal, computed } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable, tap } from 'rxjs';

    @Injectable({
    providedIn: 'root'
    })
    export class AuthService {
    private http = inject(HttpClient);
    
    // La URL debe coincidir con setFilterProcessesUrl("/api/login") de tu Java
    private URL_LOGIN = 'http://localhost:8080/api/login';

    // Usamos un Signal para guardar el estado del usuario
    // Esto permite que el Navbar se actualice solo cuando alguien entra
    private _authSignal = signal<any>(this.getUserFromStorage());

    // Getter para que otros componentes lean el usuario
    public user = computed(() => this._authSignal());

    // 1. Método para iniciar sesión
    login(credentials: any): Observable<any> {
        return this.http.post<any>(this.URL_LOGIN, credentials).pipe(
        tap(response => {
            // Guardamos en el navegador para que no se borre al refrescar (F5)
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            
            // Actualizamos el signal con los datos del usuario
            this._authSignal.set(response);
        })
        );
    }

    // 2. Método para cerrar sesión
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this._authSignal.set(null);
    }

    // 3. Método auxiliar para recuperar la sesión al cargar la web
    private getUserFromStorage() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    // 4. Token getter para los Interceptors (lo usaremos más adelante)
    getToken() {
        return localStorage.getItem('token');
    }
    }