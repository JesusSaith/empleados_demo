import { Routes } from '@angular/router';
import { Personas } from './components/personas/personas';
import { Puestos } from './components/puestos/puestos';
//import { Empleados } from './components/empleados-puestos/empleados-puestos';
import { EmpleadosPuestos } from './components/empleados-puestos/empleados-puestos';

export const routes: Routes = [
  { path: 'personas', component: Personas},
  { path: 'puestos', component: Puestos },
  { path: 'asignaciones', component: EmpleadosPuestos},
  { path: '', redirectTo: '/personas', pathMatch: 'full' } 
];