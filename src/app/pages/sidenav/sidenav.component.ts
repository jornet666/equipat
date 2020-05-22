
import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, ChangeDetectorRef, OnDestroy, Injectable, ViewEncapsulation} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, Routes} from '@angular/router';
import {MenuService,Menu_tree } from '../servicios/menus.service';
import {SeguridadService} from '../servicios/seguridad.service';
import {Observable} from 'rxjs';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css',
  '../../../assets/plugins/fontawesome-free/css/all.min.css',
  '../../../assets/plugins/dist/css/adminlte.min.css'
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ],
  providers: [MenuService, SeguridadService]
})
@Injectable()
export class SidenavComponent implements OnInit {

  lmenus:any =[];
  menu_tree: Menu_tree[];
  treeControl = new NestedTreeControl<Menu_tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Menu_tree>();
  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              private _menuService: MenuService,
              private _seguridadService: SeguridadService
  ){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.listaModulos = 
  }

  //Variables
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  listaAcceso: Routes ;
  menuItems: any[];

  ngOnInit() {
    this.ObtenerLista();
    this.ObtenerMenuTree();
  
  }
  ngAfterViewInit() {
  }

ObtenerLista() {
  this.listaAcceso = [];

}
ObtenerMenuTree() {
  let ArrayS;
  
  this.dataSource.data = null;
  this._seguridadService.ObtnerMenuPorPerfil(2).subscribe(
    response => {

        ArrayS = response;
        ArrayS.forEach(element => {
            const m_t: Menu_tree = {
                                cve_menu : element['cve_menu'],
                                nombre: element['nombre'],
                                pagina: element['pagina'],
                                icono: element['imagen'],
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
  


}// Termina clase

export interface ListaMenu {
  label: string;
  nombre: string;

}


export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}