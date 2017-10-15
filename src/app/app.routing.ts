import { Routes } from '@angular/router'

export const appRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/notepad',
    },
    {
        path: '*',
        redirectTo: '/notepad',
    },
]
