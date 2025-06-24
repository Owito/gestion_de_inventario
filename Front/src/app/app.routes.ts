import { Routes } from '@angular/router';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { MaterialesComponent } from './components/materiales/materiales.component';
import { EscuelasComponent } from './components/escuelas/escuelas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { VentaDetalleComponent } from './components/ventas/venta-detalle/venta-detalle.component';
import { DespachosComponent } from './components/despachos/despachos.component';
import { InventariosComponent } from './components/inventarios/inventarios.component';

export const routes: Routes = [
    { path: '', redirectTo: 'proveedores', pathMatch: 'full' },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'materiales', component: MaterialesComponent },
    { path: 'escuelas', component: EscuelasComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'ventas/:id', component: VentaDetalleComponent },
    { path: 'despachos', component: DespachosComponent },
    { path: 'inventario', component: InventariosComponent }
    // Aquí se agregarán las rutas para los demás módulos
];
