import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home'; // Cambiado a HomeComponent
import { ProductosComponent } from './components/productos/productos';
import { LoginComponent } from './components/login/login';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'shop', component: ProductosComponent },
    { path: 'login', component : LoginComponent},
    { path: '**', redirectTo: '' }
];