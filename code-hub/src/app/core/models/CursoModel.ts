import { HorarioModel } from './HorarioModel';

export interface CursoModel {
  id?: number;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  profesorId: number;
  imagen: string;
  estado: string;
  alumnos?: number;
  horarios?: HorarioModel[]; // horarios incluidos dentro del curso
}