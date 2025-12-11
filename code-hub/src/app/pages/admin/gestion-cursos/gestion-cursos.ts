import { Component } from '@angular/core';
import { CursoModel } from '../../../core/models/CursoModel';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CursosService } from '../../../core/services/CursosService';
import { UsuarioService } from '../../../core/services/usuarioService';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormatoFechaPipe } from '../../../shared/pipes/FormatoFecha-pipe';

@Component({
  selector: 'app-gestion-cursos',
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormatoFechaPipe],
  templateUrl: './gestion-cursos.html',

})
export class GestionCursos {
  cursos: CursoModel[] = [];
  filtros: FormGroup;
  profesores: { [id: number]: string } = {}; 

  // Modal
  mostrarModal = false;
  cursoSeleccionado: CursoModel | null = null;
  formEditarCurso: FormGroup;

  constructor(
    private cursosService: CursosService,
    private usuarioService: UsuarioService,
    private fb: FormBuilder
  ) {
    this.filtros = this.fb.group({
      nombre: [''],
      profesor: [''],
      estado: ['']
    });

    // Formulario del modal de edición
    this.formEditarCurso = this.fb.group({
      nombre: [''],
      descripcion: [''],
      fechaInicio: [''],
      profesorId: [''],
      estado: ['activo']
    });
  }

  ngOnInit(): void {
    // Cargar profesores
    this.usuarioService.getUsuarios().subscribe(users => {
      users.forEach(u => {
        if (u.roleId === 2) { // solo docentes
          this.profesores[u.id!] = u.nombre;
        }
      });
    });

    this.cargarCursos();

    this.filtros.valueChanges.subscribe(() => {
      // se dispara cada vez que cambian los inputs
    });
  }

  cargarCursos() {
    this.cursosService.getCursos().subscribe(res => {
      this.cursos = res;
    });
  }

  getNombreProfesor(id: number) {
    return this.profesores[id] || 'Desconocido';
  }

  get cursosFiltrados() {
    const { nombre, profesor, estado } = this.filtros.value;

    return this.cursos.filter(c => {
      const coincideNombre = nombre
        ? c.nombre.toLowerCase().includes(nombre.toLowerCase())
        : true;

      const coincideProfesor = profesor
        ? this.getNombreProfesor(c.profesorId).toLowerCase().includes(profesor.toLowerCase())
        : true;

      const coincideEstado = estado
        ? (estado === 'Activo' && c.estado === 'activo') ||
          (estado === 'Inactivo' && c.estado === 'inactivo')
        : true;

      return coincideNombre && coincideProfesor && coincideEstado;
    });
  }

  eliminarCurso(id: number) {
    this.cursosService.eliminarCurso(id).subscribe(() => this.cargarCursos());
  }

  // ---------------- Modal de edición ----------------

  abrirModal(curso: CursoModel) {
    this.cursoSeleccionado = curso;
    this.formEditarCurso.patchValue({
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      fechaInicio: curso.fechaInicio,
      profesorId: curso.profesorId,
      estado: curso.estado
    });
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.cursoSeleccionado = null;
  }

  guardarCambios() {
    if (!this.cursoSeleccionado) return;

    const datosActualizados = this.formEditarCurso.value;
    this.cursosService.actualizarCurso(this.cursoSeleccionado.id!, datosActualizados)
      .subscribe(() => {
        this.cargarCursos();
        this.cerrarModal();
      });
  }
  get profesoresIds() {
  return Object.keys(this.profesores);
}
  
}
