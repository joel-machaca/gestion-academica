import { Routes } from "@angular/router";
import { EstudianteLayout } from "../../layouts/estudiante-layout/estudiante-layout";
import { Cursos } from "./cursos/cursos";
import { DetalleCurso } from "./detalle-curso/detalle-curso";
import { Horario } from "./horario/horario";

export const ESTUDIANTE_ROUTES:Routes=[
    {
        path:'',
        component:EstudianteLayout,
        children:[
            {
                path:'',
                component:Horario
            },
            {
                path:'curso/detalle',
                component:DetalleCurso
            },
            {
                path:'curso',
                component:Cursos
            },
        ]
    }
]