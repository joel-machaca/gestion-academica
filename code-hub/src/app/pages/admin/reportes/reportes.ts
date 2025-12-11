import { Component, OnInit} from '@angular/core';
import { Chart, registerables } from 'chart.js';


import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../core/services/usuarioService';
import { CursosService } from '../../../core/services/CursosService';
import { MatriculasService } from '../../../core/services/MatriculasService';
import { AsistenciaService } from '../../../core/services/AsistenciaService';
import { AsistenciaModel } from '../../../core/models/AsistenciaModel';
import { MatriculaModel } from '../../../core/models/MatriculaModel';
import { CursoModel } from '../../../core/models/CursoModel';
import { UsuarioModel } from '../../../core/models/UsuarioModel';


Chart.register(...registerables);
@Component({
  selector: 'app-reportes',
  imports: [CommonModule],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css',
})
export class Reportes{
  usuarios: UsuarioModel[] = [];
  cursos: CursoModel[] = [];
  matriculas: MatriculaModel[] = [];
  asistencias: AsistenciaModel[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private cursosService: CursosService,
    private matriculasService: MatriculasService,
    private asistenciaService: AsistenciaService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarCursos();
    this.cargarMatriculas();
    this.cargarAsistencias();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  cargarCursos() {
    this.cursosService.getCursos().subscribe(data => this.cursos = data);
  }

  cargarMatriculas() {
    this.matriculasService.getMatriculas().subscribe(data => this.matriculas = data);
  }

  cargarAsistencias() {
    this.asistenciaService.getAsistencias().subscribe(data => this.asistencias = data);
  }

  // Totales
  getTotalUsuarios(): number {
    return this.usuarios.length;
  }

  getTotalCursos(): number {
    return this.cursos.length;
  }

  getTotalMatriculas(): number {
    return this.matriculas.length;
  }

  // Asistencia por curso
  getAsistenciaPorCurso(cursoId: number): number {
    const totalMatriculas = this.matriculas.filter(m => m.cursoId === cursoId).length;
    if (totalMatriculas === 0) return 0;

    const asistenciasCurso = this.asistencias.filter(
      a => a.cursoId === cursoId && a.estado === 'asistió'
    ).length;

    return (asistenciasCurso / totalMatriculas) * 100;
  }

  // Asistencia promedio general
  getAsistenciaPromedio(): number {
    if (this.cursos.length === 0) return 0;
    const total = this.cursos.reduce((acc, curso) => acc + this.getAsistenciaPorCurso(curso.id!), 0);
    return total / this.cursos.length;
  }

  // Nombre del profesor en base al ID
  getNombreProfesor(profesorId: number): string {
    const usuario = this.usuarios.find(u => u.id === profesorId);
    return usuario ? usuario.nombre : 'Desconocido';
  }
  getTotalMatriculasPorCurso(cursoId?: number): number {
  if (!cursoId) return 0;
  return this.matriculas.filter(m => m.cursoId === cursoId).length;
}
}
