import { Component } from '@angular/core';
import { Aside } from "../../shared/components/aside/aside";
import { ButtonAside } from "../../shared/components/buttonAside/buttonAside";
import { Header } from "../../shared/components/header/header";
import { IconLibro } from "../../shared/icons/icon-libro/icon-libro";
import { RouterModule } from "@angular/router";
import { IconAsistencia } from "../../shared/icons/icon-asistencia/icon-asistencia";
import { IconCalendario } from "../../shared/icons/icon-calendario/icon-calendario";

@Component({
  selector: 'app-docente-layout',
  imports: [Aside, ButtonAside, Header, IconLibro, RouterModule, IconAsistencia, IconCalendario],
  templateUrl: './docente-layout.html',
})
export class DocenteLayout {
  isOpen = true;

  handleClick() {
    this.isOpen = !this.isOpen;
  }
}
