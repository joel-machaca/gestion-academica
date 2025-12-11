import { Component } from '@angular/core';
import { ButtonAside } from "../../shared/components/buttonAside/buttonAside";
import { Header } from "../../shared/components/header/header";
import { Aside } from "../../shared/components/aside/aside";
import { IconUsuario } from "../../shared/icons/icon-usuario/icon-usuario";
import { IconLibro } from "../../shared/icons/icon-libro/icon-libro";
import { IconBarra } from "../../shared/icons/icon-barra/icon-barra";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-estudiante-layout',
  imports: [ButtonAside, Header, Aside, IconUsuario, IconLibro, RouterModule],
  templateUrl: './estudiante-layout.html',
})
export class EstudianteLayout {
  isOpen = true;

  handleClick() {
    this.isOpen = !this.isOpen;
  }
}
