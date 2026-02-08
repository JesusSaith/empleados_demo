import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Data } from '../../services/data';
import { FiltroGlobalPipe } from '../../pipes/filtro-global.pipe';
import { Persona } from '../../models/empleados.interface';

@Component({
  selector: 'app-personas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FiltroGlobalPipe],
  templateUrl: './personas.html',
  styleUrl: './personas.scss'
})
export class Personas { 
  private fb = inject(FormBuilder);
  private dataService = inject(Data);

  fechaMaxima = new Date().toISOString().split('T')[0];

  textoFiltro = signal('');
  listaPersonas = computed(() => this.dataService.listaPersonas());

  
  personaForm = this.fb.group({
    id: [Date.now()], 
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    fechaNacimiento: ['', Validators.required]
  });

  
  esEdicion = signal(false);

  
  guardar() {
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.value as any;
      
      
    if (!this.esEdicion()) {
      
      const ids = this.listaPersonas().map(p => p.id);
      const maxId = ids.length > 0 ? Math.max(...ids) : 0;
      persona.id = maxId + 1; 
    }

      this.dataService.guardarPersona(persona);
      this.limpiar();
    }
  }

 
  editar(p: Persona) {
    this.esEdicion.set(true);
    this.personaForm.setValue({
      id: p.id,
      nombre: p.nombre,
      apellido: p.apellido,
      fechaNacimiento: p.fechaNacimiento
    } as any);
  }

 
  eliminar(id: number) {
    if (confirm('¿Eliminar registro?')) {
      this.dataService.eliminarPersona(id);
      this.limpiar(); 
    }
  }

  
  limpiar() {
    this.esEdicion.set(false);
    this.personaForm.reset({ id: Date.now() });
  }
}