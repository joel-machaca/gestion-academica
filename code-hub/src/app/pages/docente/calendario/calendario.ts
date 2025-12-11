import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursosService } from '../../../core/services/CursosService';
import { CursoModel } from '../../../core/models/CursoModel';

@Component({
  selector: 'app-calendario',
  imports: [CommonModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
  cursos: CursoModel[] = [];
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  profesorId: number | null = null;

  constructor(private cursoService: CursosService) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.profesorId = user.id;
      this.cargarCursosProfesor();
    } else {
      console.error('No se encontró usuario logueado en localStorage');
    }
  }

  cargarCursosProfesor() {
    if (!this.profesorId) return;

    this.cursoService.getCursosPorProfesor(this.profesorId).subscribe({
      next: (cursos) => {
        this.cursos = cursos;
        console.log('Cursos cargados:', this.cursos);
      },
      error: (err) => console.error(err)
    });
  }

  // Devuelve los horarios de todos los cursos del profesor para un día específico
  getHorariosPorDia(dia: string) {
    return this.cursos
      .flatMap(curso => (curso.horarios || []).map(h => ({ ...h, cursoNombre: curso.nombre, cursoId: curso.id })))
      .filter(h => h.dia === dia);
  }

  getNombreCurso(cursoId: number): string {
    const curso = this.cursos.find(c => c.id === cursoId);
    return curso ? curso.nombre : `Curso ID: ${cursoId}`;
  }
}
