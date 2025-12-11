import { Component } from '@angular/core';
import { UsuarioModel } from '../../../core/models/UsuarioModel';
import { UsuarioService } from '../../../core/services/usuarioService';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-usuario',
  imports: [ReactiveFormsModule ,RouterModule,CommonModule],
  templateUrl: './gestion-usuario.html',
})
export class GestionUsuario {
  usuarios: UsuarioModel[] = [];
  filtros: FormGroup;

  // Modal
  mostrarModal: boolean = false;
  formEditarUsuario: FormGroup;
  usuarioSeleccionado: UsuarioModel | null = null;

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder) {
    this.filtros = this.fb.group({
      nombreEmail: [''],
      rol: ['']
    });

    this.formEditarUsuario = this.fb.group({
      nombre: [''],
      apellido: [''],
      email: [''],
      roleId: [''],
      estado: ['activo']
    });
  }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.filtros.valueChanges.subscribe(() => {
      // Se dispara cada vez que cambian los filtros
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.usuarios = res;
    });
  }

  get usuariosFiltrados() {
    const { nombreEmail, rol } = this.filtros.value;

    return this.usuarios.filter(u => {
      const coincideNombreEmail = nombreEmail
        ? u.nombre.toLowerCase().includes(nombreEmail.toLowerCase()) ||
          u.email.toLowerCase().includes(nombreEmail.toLowerCase())
        : true;

      const coincideRol = rol
        ? (rol === 'Administrador' && u.roleId === 1) ||
          (rol === 'Docente' && u.roleId === 2) ||
          (rol === 'Estudiante' && u.roleId === 3)
        : true;

      return coincideNombreEmail && coincideRol;
    });
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
  }

  // Abrir modal y rellenar formulario
  abrirModal(usuario: UsuarioModel) {
  this.usuarioSeleccionado = usuario;

  const partes = usuario.nombre.split(' ');
  const nombre = partes[0] || '';
  const apellido = partes.slice(1).join(' ') || '';

  this.formEditarUsuario.patchValue({
    nombre,
    apellido,
    email: usuario.email,
    roleId: usuario.roleId,
    estado: usuario.estado
  });

  this.mostrarModal = true;
}

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
    this.formEditarUsuario.reset({ estado: 'activo' });
  }

  guardarCambios() {
  if (!this.usuarioSeleccionado) return;

  const cambios: Partial<UsuarioModel> = {
    nombre: `${this.formEditarUsuario.value.nombre} ${this.formEditarUsuario.value.apellido}`,
    email: this.formEditarUsuario.value.email,
    roleId: Number(this.formEditarUsuario.value.roleId),
    estado: this.formEditarUsuario.value.estado
  };

  this.usuarioService.patchUsuario(this.usuarioSeleccionado.id!, cambios)
    .subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
}

}
