
import { trigger, state, style, transition, animate } from '@angular/animations';
import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, Injectable, ViewEncapsulation} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router, Routes} from '@angular/router';
import {MenuService, Menu_tree } from '../../services/menus.service';
import {SeguridadService} from '../../services/seguridad.service';
import {Observable} from 'rxjs';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  '../../../assets/plugins/fontawesome-free/css/all.min.css',
  '../../../assets/plugins/dist/css/adminlte.min.css'],
  providers: [MenuService, SeguridadService]
})
export class HomeComponent implements OnInit {

  menu_tree: Menu_tree[];
  treeControl = new NestedTreeControl<Menu_tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Menu_tree>();
  opened: boolean;
  nombre_Perfil: string;
  nombre_usuario: string;

  //Variables
  menuItems: any[];
  constructor(
              private _menuService: MenuService,
              private _seguridadService: SeguridadService
  ){
    console.log("constructor");
  }

  ngOnInit() {
    console.log("Inicia home");
    
    this._seguridadService.ValidarToken();
    console.log("Inicia validar token");
    this.nombre_usuario = sessionStorage.getItem('nombre_usuario');
    this.nombre_Perfil = sessionStorage.getItem('nombre_perfil_nav');
    this.ObtenerMenuTree();
  }
  ngAfterViewInit() {
  }

ObtenerMenuTree() {
  
  let cve_perfil = sessionStorage.getItem('cve_perfil_nav');
  let ArrayS;
  this.dataSource.data = null;
  this._seguridadService.ObtnerMenuPorPerfil(cve_perfil).subscribe(
    response => {
        ArrayS = response;
        ArrayS.forEach(element => {
            const m_t: Menu_tree = {
                                cve_menu : element['cve_menu'],
                                nombre: element['nombre'],
                                pagina: element['pagina'],
                                icono: element['imagen'],
                                existe: element['Existe'],
                                children:  []
                            }

            if (element['cve_padremenu'] === '0'){
                this._menuService.CrearEncabezadoTreeView(m_t);
            } else {
                this._menuService.CrearCuerpoTreeView(m_t, element['cve_padremenu']);
            }
        });
       this.dataSource.data = this._menuService.GetTreeView();
    },error => {
        console.log(error);
     
    }
);

}
  hasChild = (_: number, node: Menu_tree) => !!node.children && node.children.length > 0;



}

