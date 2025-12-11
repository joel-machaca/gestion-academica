import { Component } from '@angular/core';
import { CursosService } from '../../../core/services/CursosService';
import { MatriculasService } from '../../../core/services/MatriculasService';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/services/usuarioService';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-cursos',
  imports: [CommonModule, RouterModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css',
})
export class Cursos {
  cursosAlumno: any[] = [];
  alumnoId!: number;
  usuarios: any[] = [];

  constructor(
    private cursosService: CursosService,
    private matriculasService: MatriculasService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const usuario = JSON.parse(currentUser);
      this.alumnoId = usuario.id;
      this.loadUsuarios();
    }
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.usuarios = users;
      this.getCursosDelAlumno();
    });
  }

  getCursosDelAlumno() {
    this.matriculasService.getMatriculas().subscribe((matriculas: any[]) => {
      const misMatriculas = matriculas.filter(m => m.usuarioId === this.alumnoId);
      const cursoIds = misMatriculas.map(m => m.cursoId);

      this.cursosService.getCursos().subscribe((cursos: any[]) => {
        // Filtrar solo los cursos del alumno y añadir nombre del profesor
        this.cursosAlumno = cursos
          .filter(c => cursoIds.includes(c.id))
          .map(c => {
            const prof = this.usuarios.find(u => u.id === c.profesorId);
            return { ...c, profesor: prof ? prof.nombre : 'Sin profesor' };
          });
      });
    });
  }
}
