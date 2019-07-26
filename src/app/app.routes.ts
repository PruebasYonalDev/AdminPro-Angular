import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { Nopage404Component } from './shared/nopage404/nopage404.component';


const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: Nopage404Component}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, {useHash: true});
