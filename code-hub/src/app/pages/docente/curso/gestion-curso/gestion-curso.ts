import { Component, OnInit } from '@angular/core';
import { CursoModel } from '../../../../core/models/CursoModel';
import { CursosService } from '../../../../core/services/CursosService';
import { CommonModule } from '@angular/common';
import { MatriculaModel } from '../../../../core/models/MatriculaModel';
import { MatriculasService } from '../../../../core/services/MatriculasService';

@Component({
  selector: 'app-gestion-curso',
  imports: [CommonModule],
  templateUrl: './gestion-curso.html',
  styleUrl: './gestion-curso.css',
})
export class GestionCurso implements OnInit{
  cursos: CursoModel[] = [];
  matriculas: MatriculaModel[] = [];
  diasSemana = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  profesorId: number | null = null;

  constructor(private cursoService: CursosService, private matriculasService: MatriculasService) {}

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const user = JSON.parse(currentUser);
      this.profesorId = user.id;
      this.cargarDatos();
    } else {
      console.error('No se encontró usuario logueado en localStorage');
    }
  }

  cargarDatos() {
    if (!this.profesorId) return;

    // Cargamos cursos del profesor
    this.cursoService.getCursosPorProfesor(this.profesorId).subscribe({
      next: (cursos: CursoModel[]) => {
        this.cursos = cursos;

        // Cargamos matriculas para calcular alumnos por curso
        this.matriculasService.getMatriculas().subscribe({
          next: (matriculas: MatriculaModel[]) => {
            this.matriculas = matriculas;
            this.cursos.forEach(c => {
              c.alumnos = this.matriculas.filter(m => m.cursoId === c.id).length;
            });
          },
          error: (err: any) => console.error('Error al cargar matriculas:', err)
        });
      },
      error: (err: any) => console.error('Error al cargar cursos:', err)
    });
  }

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
