export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date | string;
}

export interface Puesto {
  id: number;
  nombre: string;
}

export interface EmpleadoPuesto {
  id: number;
  puesto: Puesto;
  persona: Persona;
}