import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent} from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';




export const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent,
        children: [
            {path: 'menu', component: MenuComponent},
            {path: 'perfiles', component: PerfilesComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'push', component: NotificacionesComponent}
            
        ]},
    
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

// tslint:disable-next-line: variable-name
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

