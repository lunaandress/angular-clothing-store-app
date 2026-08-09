import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home'; // Cambiado a HomeComponent
import { LoginComponent } from './components/login/login';
import { ProductosComponent } from './components/productos/productos';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', component: ProductosComponent },
    { path: 'login', component : LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];