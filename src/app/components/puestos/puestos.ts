import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Data} from '../../services/data';
import { FiltroGlobalPipe } from '../../pipes/filtro-global.pipe';
import { Puesto } from '../../models/empleados.interface';

@Component({
  selector: 'app-puestos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FiltroGlobalPipe],
  templateUrl: './puestos.html',
  styleUrl: './puestos.scss' 
})
export class Puestos {
  private fb = inject(FormBuilder);
  private dataService = inject(Data);

 
  textoFiltro = signal('');
  listaPuestos = computed(() => this.dataService.listaPuestos());
  esEdicion = signal(false);

 
  puestoForm = this.fb.group({
    id: [Date.now()],
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  
  guardar() {
    if (this.puestoForm.valid) {
      const puesto: Puesto = this.puestoForm.value as any;

    if (!this.esEdicion()) {
       
        const ids = this.listaPuestos().map(p => p.id);
       
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      
        puesto.id = maxId + 1;
      }
    this.dataService.guardarPuesto(puesto);
    this.limpiar();
    }
  }

  
  editar(p: Puesto) {
    this.esEdicion.set(true);
    this.puestoForm.setValue({
      id: p.id,
      nombre: p.nombre
    } as any);
  }

 
  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este puesto?')) {
      this.dataService.eliminarPuesto(id);
      this.limpiar();
    }
  }

 
  limpiar() {
    this.esEdicion.set(false);
    this.puestoForm.reset({ id: Date.now() });
  }
}