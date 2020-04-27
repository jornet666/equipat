import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';



const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'login'}
];

// tslint:disable-next-line: variable-name
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);