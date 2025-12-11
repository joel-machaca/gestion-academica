import { Component } from '@angular/core';
import { UsuarioModel } from '../../../core/models/UsuarioModel';
import { MatriculaModel } from '../../../core/models/MatriculaModel';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../core/services/usuarioService';
import { MatriculasService } from '../../../core/services/MatriculasService';
import { CommonModule } from '@angular/common';
import { CursoModel } from '../../../core/models/CursoModel';
import { CursosService } from '../../../core/services/CursosService';

@Component({
  selector: 'app-matricula',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './matricula.html',
  styleUrl: './matricula.css',
})
export class Matricula {
  alumnos: UsuarioModel[] = [];
  cursos: CursoModel[] = [];
  matriculas: MatriculaModel[] = [];
  formMatricula: FormGroup;

  // Modal
  mostrarModal: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private matriculasService: MatriculasService,
    private cursosService: CursosService,
    private fb: FormBuilder
  ) {
    this.formMatricula = this.fb.group({
      alumnoId: [''],
      cursoId: ['']
    });
  }

  ngOnInit(): void {
    this.cargarAlumnos();
    this.cargarCursos();
    this.cargarMatriculas();
  }

  cargarAlumnos() {
    this.usuarioService.getUsuarios().subscribe(users => {
      this.alumnos = users.filter(u => u.roleId === 3);
    });
  }

  cargarCursos() {
    this.cursosService.getCursos().subscribe(res => {
      this.cursos = res;
    });
  }

  cargarMatriculas() {
    this.matriculasService.getMatriculas().subscribe(res => {
      this.matriculas = res;
    });
  }

  // Mostrar modal
  abrirModal() {
    this.mostrarModal = true;
    this.formMatricula.reset();
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  matricular() {
  const { alumnoId, cursoId } = this.formMatricula.value;
  if (!alumnoId || !cursoId) return;

  // Verificamos si ya existe matrícula
  const yaMatriculado = this.matriculas.some(
    m => m.usuarioId === Number(alumnoId) && m.cursoId === Number(cursoId)
  );
  if (yaMatriculado) return;

  // No enviamos id para que JSON Server genere uno único
  const nuevaMatricula: MatriculaModel = {
    usuarioId: Number(alumnoId),
    cursoId: Number(cursoId)
  };

  this.matriculasService.crearMatricula(nuevaMatricula).subscribe(() => {
    this.cargarMatriculas();
    this.cerrarModal();
  });
}


  eliminarMatricula(id: number) {
    this.matriculasService.eliminarMatricula(id).subscribe(() => {
      this.cargarMatriculas();
    });
  }

  getNombreAlumno(id: number): string {
    const alumno = this.alumnos.find(a => a.id === id);
    return alumno ? alumno.nombre : 'Desconocido';
  }

  getNombreCurso(id: number): string {
    const curso = this.cursos.find(c => c.id === id);
    return curso ? curso.nombre : 'Desconocido';
  }

  // Filtrar alumnos disponibles según curso seleccionado
  alumnosDisponibles(): UsuarioModel[] {
    const cursoId = this.formMatricula.value.cursoId;
    if (!cursoId) return this.alumnos;

    return this.alumnos.filter(a => {
      return !this.matriculas.some(m => m.usuarioId === a.id && m.cursoId === Number(cursoId));
    });
  }
}
