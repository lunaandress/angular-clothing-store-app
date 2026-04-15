    import { computed, Injectable, signal } from '@angular/core';

    export interface ItemCarrito {
    idProducto: number;
    nombre: string;
    precio: number;
    cantidad: number;
    }

    @Injectable({ providedIn: 'root' })
    export class CartService {
    // Aquí se guardan los productos temporalmente
    private _items = signal<ItemCarrito[]>([]);

    // Esto es para que otros componentes lean los productos
    items = computed(() => this._items());
    
    // Esto cuenta cuántos productos hay en total (para el icono de la cesta)
    totalItems = computed(() => this._items().reduce((acc, item) => acc + item.cantidad, 0));

    agregarProducto(producto: any) {
        const actual = this._items();
        const existe = actual.find(i => i.idProducto === producto.id);

        if (existe) {
        // Si ya existe, solo subimos la cantidad (Jeans x2, x3...)
        this._items.set(actual.map(i => 
            i.idProducto === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i
        ));
        } else {
        // Si no existe, lo añadimos de cero
        this._items.set([...actual, { 
            idProducto: producto.id, 
            nombre: producto.nombre, 
            precio: producto.precio, 
            cantidad: 1 
        }]);
        }
    }

    limpiarCarrito() {
        this._items.set([]);
    }

    eliminarProducto(idProducto: number) {
    const actual = this._items();
    this._items.set(actual.filter(item => item.idProducto !== idProducto));
    }

    }