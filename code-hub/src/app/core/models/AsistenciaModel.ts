export interface AsistenciaModel {
  id?: number;          // opcional, porque el backend asigna el id al crear
  cursoId: number;      // referencia al curso
  usuarioId: number;    // referencia al alumno
  fecha: string;        // formato "YYYY-MM-DD"
  estado: 'asistió' | 'faltó';  // estado de la asistencia
}