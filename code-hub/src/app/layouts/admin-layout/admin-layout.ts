import { Component } from '@angular/core';
import { ButtonAside } from '../../shared/components/buttonAside/buttonAside';
import { Aside } from "../../shared/components/aside/aside";
import { Header } from '../../shared/components/header/header';
import { IconUsuario } from "../../shared/icons/icon-usuario/icon-usuario";
import { IconLibro } from "../../shared/icons/icon-libro/icon-libro";
import { IconBarra } from "../../shared/icons/icon-barra/icon-barra";
import { RouterModule } from "@angular/router";
import { IconMatricula } from "../../shared/icons/icon-matricula/icon-matricula";

@Component({
  selector: 'app-admin-layout',
  imports: [ButtonAside, Aside, Header, IconUsuario, IconLibro, IconBarra, RouterModule, IconMatricula],
  templateUrl: './admin-layout.html',
})
export class AdminLayout {

}
