import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home'; // Cambiado a HomeComponent
import { ProductosComponent } from './components/productos/productos';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'shop', component: ProductosComponent },
    { path: '**', redirectTo: '' }
];