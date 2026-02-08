import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Data } from '../../services/data';
import { FiltroGlobalPipe } from '../../pipes/filtro-global.pipe';
import { EmpleadoPuesto, Persona, Puesto } from '../../models/empleados.interface';


@Component({
  selector: 'app-empleados-puestos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FiltroGlobalPipe],
  templateUrl: './empleados-puestos.html',
  styleUrl: './empleados-puestos.scss' 
})
export class EmpleadosPuestos { 
  private fb = inject(FormBuilder);
  private dataService = inject(Data);

 
  textoFiltro = signal('');
  
  // Listas 
  listaAsignaciones = computed(() => this.dataService.listaAsignaciones());
  personasDisponibles = computed(() => this.dataService.listaPersonas());
  puestosDisponibles = computed(() => this.dataService.listaPuestos());

  esEdicion = signal(false);

  
  asignacionForm = this.fb.group({
    id: [Date.now()],
    personaId: ['', Validators.required], 
    puestoId: ['', Validators.required]
  });



guardar() {
  if (this.asignacionForm.valid) {
    const formValue = this.asignacionForm.value;
    
   
    const personaSeleccionada = this.personasDisponibles().find(p => p.id == Number(formValue.personaId));
    const puestoSeleccionado = this.puestosDisponibles().find(p => p.id == Number(formValue.puestoId));

    if (personaSeleccionada && puestoSeleccionado) {
      
      
      let nuevoId = Number(formValue.id); 

      if (!this.esEdicion()) {
        
        const ids = this.listaAsignaciones().map(a => a.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        nuevoId = maxId + 1;
      }

      const nuevaAsignacion: EmpleadoPuesto = {
        id: nuevoId,
        persona: personaSeleccionada,
        puesto: puestoSeleccionado
      };

      this.dataService.guardarAsignacion(nuevaAsignacion);
      this.limpiar();
    }
  }
}

  editar(item: EmpleadoPuesto) {
    this.esEdicion.set(true);
   
    this.asignacionForm.patchValue({
      id: item.id,
      personaId: item.persona.id.toString(),
      puestoId: item.puesto.id.toString()
    } as any);
  }

  eliminar(id: number) {
    if (confirm('¿Deseas eliminar esta asignación?')) {
      this.dataService.eliminarAsignacion(id);
      this.limpiar();
    }
  }

  limpiar() {
    this.esEdicion.set(false);
    this.asignacionForm.reset({ id: Date.now(), personaId: '', puestoId: '' });
  }
}