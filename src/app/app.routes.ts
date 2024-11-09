import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren:()=> import('./auth/features/auth.routes')
    },
    {
        path: 'formulario',
        loadChildren:()=> import('./formulario/features/formulario.routes')
    },
    {
        path: '*',
        redirectTo: ''
    }
];
