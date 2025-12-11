import { Routes } from "@angular/router";
import { EstudianteLayout } from "../../layouts/estudiante-layout/estudiante-layout";
import { Cursos } from "./cursos/cursos";

export const ESTUDIANTE_ROUTES:Routes=[
    {
        path:'',
        component:EstudianteLayout,
        children:[
            {
                path:'',
                component:Cursos
            }
        ]
    }
]