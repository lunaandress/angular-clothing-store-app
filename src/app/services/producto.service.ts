import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'; // Añadimos Subject
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/productos';
  
  // Canal para comunicar el término de búsqueda
  private searchSource = new Subject<string>();
  search$ = this.searchSource.asObservable();

  constructor(private http: HttpClient) { }

  // Método para que el Navbar envíe el texto
  enviarTerminoBusqueda(termino: string) {
    this.searchSource.next(termino);
  }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }

  buscarPorNombre(termino: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.urlEndPoint}/filtrar/${termino}`);
  }

  crearPedido(pedido: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/pedidos', pedido);
  }
}