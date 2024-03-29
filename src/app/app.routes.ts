import { Routes } from "@angular/router"
import { AutenticadoGuard } from "./guards/autenticado.guard"

export const AppRotas: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'player',
        loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule),
        canLoad: [ AutenticadoGuard ]
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
    }
]
