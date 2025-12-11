import { Routes } from '@angular/router';
import { roleGuard } from './core/guards/Role-guard';


export const routes: Routes = [
    {
        path:"",
        loadChildren:()=> import('./auth/auth.routes').then(m=>m.AUTH_ROUTES),
    },
    {
        path:"admin",
        loadChildren:()=> import('./pages/admin/admin.routes').then(m=>m.ADMIN_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[1]}
    },
    {
        path:"docente",
        loadChildren:()=> import('./pages/docente/docente.routes').then(m=>m.DOCENTE_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[2]}
    },
    {
        path:"estudiante",
        loadChildren:()=> import('./pages/estudiante/estudiante.routes').then(m=>m.ESTUDIANTE_ROUTES),
        canActivate:[roleGuard],
        data:{roles:[3]}
    },
];
