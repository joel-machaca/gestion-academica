import { Component } from '@angular/core';
import { ButtonAside } from "../../shared/components/buttonAside/buttonAside";
import { Header } from "../../shared/components/header/header";
import { Aside } from "../../shared/components/aside/aside";

import { IconLibro } from "../../shared/icons/icon-libro/icon-libro";

import { RouterModule } from "@angular/router";

import { IconCalendario } from "../../shared/icons/icon-calendario/icon-calendario";

@Component({
  selector: 'app-estudiante-layout',
  imports: [ButtonAside, Header, Aside, IconLibro, RouterModule, IconCalendario],
  templateUrl: './estudiante-layout.html',
})
export class EstudianteLayout {
  isOpen = true;

  handleClick() {
    this.isOpen = !this.isOpen;
  }
}
