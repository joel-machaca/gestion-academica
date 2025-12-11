import { Routes } from "@angular/router";
import { AdminLayout } from "../../layouts/admin-layout/admin-layout";
import { GestionUsuario } from "./gestion-usuario/gestion-usuario";
import { CrearUsuario } from "./crear-usuario/crear-usuario";
import { GestionCursos } from "./gestion-cursos/gestion-cursos";
import { Reportes } from "./reportes/reportes";
import { CrearCurso } from "./crear -curso/crear -curso";
import { Matricula } from "./matricula/matricula";

export const ADMIN_ROUTES:Routes=[
    {
        path:'',
        component:AdminLayout,
        children:[
            {
                path:'',
                component:GestionUsuario
            },
            {
                path:'crear-usuario',
                component:CrearUsuario
            },
            {
                path:'cursos',
                component:GestionCursos
            },
            {
                path:'cursos/crear-curso',
                component:CrearCurso
            },
            {
                path:'reportes',
                component:Reportes
            },
            {
                path:'matriculas',
                component:Matricula
            },


        ]
    }
]