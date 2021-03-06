import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';

// rutas
//import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';

import { APP_ROUTING} from './app.routes';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule} from '@angular/common';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

//Componetes
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

import { PerfilesComponent } from './pages/perfiles/perfiles.component';
import { AgregarMenuComponent } from './pages/menu/agregar-menu/agregar-menu.component';
import { EditarMenuComponent } from './pages/menu/editar-menu/editar-menu.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
// Material Modules

import { MatToolbarModule, MatIconModule, MatMenuModule, MatTreeModule} from '@angular/material';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule} from '@angular/material';
import { MatSortModule, MatTableModule, MatButtonModule} from '@angular/material';
import { MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NestedTreeControl} from '@angular/cdk/tree';







//cdk
import {PortalModule} from '@angular/cdk/portal';
import {MatNativeDateModule} from '@angular/material/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';



import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgxSpinnerModule } from "ngx-spinner";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    UsuariosComponent,
    PerfilesComponent,
    AgregarMenuComponent,
    EditarMenuComponent,
    FooterComponent,
    NotificacionesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    // PerfectScrollbarModule,
    MatSidenavModule,
    MatListModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule,
    // MatMenuModule,
    // MatNativeDateModule,
    // MatTreeModule,
    // MatInputModule,
  MatPaginatorModule,
    // MatProgressSpinnerModule,
    // MatSortModule,
  MatTableModule,
    // PortalModule,
  MatButtonModule,
    // Injectable,
    // HttpClient,
  // HttpHeaders,
    // CommonModule,
   // APP_ROUTING,
   MatTreeModule,

    RouterModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG.handlers
  }
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
