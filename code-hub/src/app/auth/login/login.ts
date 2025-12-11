import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  formLogin: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    // Inicializar el formulario
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  handleSubmit(): void {
    if (this.formLogin.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor completa todos los campos'
      });
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        // Guardar token y roleId
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('roleId', res.user.roleId.toString());
        localStorage.setItem('currentUser', JSON.stringify(res.user));

        Swal.fire({
          icon: 'success',
          title: 'Bienvenido',
          text: 'Has iniciado sesión correctamente'
        }).then(() => {
          // Redirigir según rol
          const roleId = res.user.roleId;
          switch(roleId) {
            case 1: this.router.navigate(['/admin']); break;
            case 2: this.router.navigate(['/docente']); break;
            case 3: this.router.navigate(['/estudiante']); break;
            default: this.router.navigate(['/login']); break;
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Email o contraseña incorrectos'
        });
      }
    });
  }
}
