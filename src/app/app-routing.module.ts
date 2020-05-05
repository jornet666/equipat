import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
<<<<<<< HEAD
import{MenuComponent} from './pages/menu/menu.component';


const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path:'menu', component:MenuComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'},

=======
import { HomeComponent } from './pages/home/home.component';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
>>>>>>> 130f3cdde5e6e243a7173039710aab2bb24eb181
];

// tslint:disable-next-line: variable-name
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);

