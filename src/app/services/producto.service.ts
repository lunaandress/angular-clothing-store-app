import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  private urlEndPoint: string = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) { }

  // Este es el método que usará el componente
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.urlEndPoint);
  }


  crearPedido(pedido: any): Observable<any> {
  return this.http.post('http://localhost:8080/api/pedidos', pedido);
}
}