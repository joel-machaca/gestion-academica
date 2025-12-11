import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../core/services/usuarioService';
import { Router } from '@angular/router';
import { UsuarioModel } from '../../../core/models/UsuarioModel';

@Component({
  selector: 'app-crear-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.html',
  
})
export class CrearUsuario {
  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.formUsuario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmarPassword: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      estado: ['activo'] // default
    });
  }

  ngOnInit(): void {}

  crearUsuario(): void {
    if (this.formUsuario.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente', 'warning');
      return;
    }

    const { nombre, apellido, email, password, confirmarPassword, roleId, estado } = this.formUsuario.value;

    if (password !== confirmarPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const nuevoUsuario: UsuarioModel = {
      nombre: `${nombre} ${apellido}`,
      email,
      password,
      roleId: Number(roleId),
      estado,
      imagen: './profiles/profile-1.svg' // ruta por defecto
    };
    console.log(nuevoUsuario)
    this.usuarioService.register(nuevoUsuario).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
        this.formUsuario.reset()
        this.router.navigate(['/admin/crear-usuario']); // redirige al listado
      },
      error: () => {
        Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      }
    });
  }
}
