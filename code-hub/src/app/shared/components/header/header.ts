import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{
  menuOpen = false;

  nombre="usuario-default"
  rol="estudiante"
  foto="./profiles/profile-1.svg" //esta es la ruta para las imagenes

  constructor(private authService: AuthService ,private router:Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      console.log('Datos del usuario en header:', user);
      if (user) {
        this.nombre = user.nombre;
        this.foto = user.imagen;
        switch(user.roleId) {
        case 1:
          this.rol = 'Administrador';
          break;
        case 2:
          this.rol = 'Docente';
          break;
        case 3:
          this.rol = 'Estudiante';
          break;
        default:
          this.rol = 'Usuario';
      }
      }
    });
  }

  cerrarSesion() {
  this.authService.logout();
  this.router.navigate(['']);
  }
}
