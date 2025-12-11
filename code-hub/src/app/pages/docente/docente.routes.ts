import { Routes } from "@angular/router";
import { DocenteLayout } from "../../layouts/docente-layout/docente-layout";
import { Calendario } from "./calendario/calendario";
import { Asistencia } from "./curso/asistencia/asistencia";
import { GestionCurso } from "./curso/gestion-curso/gestion-curso";
import { DetalleCurso } from "./curso/detalle-curso/detalle-curso";



export const DOCENTE_ROUTES:Routes=[
    {
        path:'',
        component:DocenteLayout,
        children:[
            {
                path:'',
                component:Calendario
            },
            {
                path:'curso',
                component:GestionCurso
            },
            {
                path:'curso/asistencia',
                component:Asistencia
            },
            {
                path:'curso/contenido',
                component:DetalleCurso
            }
        ]
    }
]