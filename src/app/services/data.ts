import { Injectable, signal, effect } from '@angular/core';
import { Persona, Puesto, EmpleadoPuesto } from '../models/empleados.interface';

@Injectable({ providedIn: 'root' })
export class Data { 

  listaPersonas = signal<Persona[]>(this.leerDeStorage('personas'));
  listaPuestos = signal<Puesto[]>(this.leerDeStorage('puestos'));
  listaAsignaciones = signal<EmpleadoPuesto[]>(this.leerDeStorage('asignaciones'));

  constructor() {
    
    effect(() => localStorage.setItem('personas', JSON.stringify(this.listaPersonas())));
    effect(() => localStorage.setItem('puestos', JSON.stringify(this.listaPuestos())));
    effect(() => localStorage.setItem('asignaciones', JSON.stringify(this.listaAsignaciones())));
  }

  private leerDeStorage(key: string): any[] {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }


  guardarPersona(persona: Persona) {
    const actual = this.listaPersonas();
    const index = actual.findIndex(p => p.id === persona.id);

    if (index >= 0) {

      actual[index] = persona;
      this.listaPersonas.set([...actual]);

      
      this.listaAsignaciones.update(prev => 
        prev.map(asignacion => {
      
          if (asignacion.persona.id === persona.id) {
            return { ...asignacion, persona: persona };
          }
          return asignacion;
        })
      );

    } else {
  
      this.listaPersonas.update(prev => [...prev, persona]);
    }
  }

  eliminarPersona(id: number) {
    this.listaPersonas.update(prev => prev.filter(p => p.id !== id));
   
    this.listaAsignaciones.update(prev => prev.filter(a => a.persona.id !== id));
  }


  guardarPuesto(puesto: Puesto) {
    const actual = this.listaPuestos();
    const index = actual.findIndex(p => p.id === puesto.id);

    if (index >= 0) {
     
      actual[index] = puesto;
      this.listaPuestos.set([...actual]);

     
      this.listaAsignaciones.update(prev => 
        prev.map(asignacion => {
     
          if (asignacion.puesto.id === puesto.id) {
            return { ...asignacion, puesto: puesto };
          }
          return asignacion;
        })
      );

    } else {
  
      this.listaPuestos.update(prev => [...prev, puesto]);
    }
  }

  eliminarPuesto(id: number) {
    this.listaPuestos.update(prev => prev.filter(p => p.id !== id));

    this.listaAsignaciones.update(prev => prev.filter(a => a.puesto.id !== id));
  }


  guardarAsignacion(asignacion: EmpleadoPuesto) {
    this.listaAsignaciones.update(prev => [...prev, asignacion]);
  }

  eliminarAsignacion(id: number) {
    this.listaAsignaciones.update(prev => prev.filter(a => a.id !== id));
  }
}