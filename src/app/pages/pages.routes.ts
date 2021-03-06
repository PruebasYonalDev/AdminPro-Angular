import { RouterModule, Routes, CanActivate } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PromesasComponent } from './promesas/promesas.component';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// GUARDS
import { LoginGuard } from '../services/guards/login.guard';
import { AdminGuard } from '../services/service.index';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
           { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
           { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
           { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
           { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
           { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
           { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
           { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
           { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },
           // Mantenimientos
           {
               path: 'usuarios',
               component: UsuariosComponent,
               canActivate: [ AdminGuard ],
               data: { titulo: 'Mantenimiento de usuarios' }
            },
           { path: 'hospital', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' } },
           { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos' } },
           { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Creación y actualizacion de médicos' } },
           { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
       ]
    }


];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
