import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Perfil} from '../models/perfil.models';
import {PerfilService} from '../servicios/perfiles.service';
import {MenuService,Menu_tree } from '../servicios/menus.service';
import {SeguridadService} from '../servicios/seguridad.service';
import {Observable} from 'rxjs';
import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css',
              '../../../assets/plugins/fontawesome-free/css/all.min.css'],
  providers: [PerfilService, MenuService, SeguridadService]
})
export class PerfilesComponent implements OnInit {

  listTPerfil: any;
  perfilform: FormGroup;
  openform: boolean = false;
  accionBoton: string = '';
  nameAccion: string = '';
  accion: string= '';
  existePerfil: boolean = false;
  lmenus:any =[];
  menu_tree: Menu_tree[];
  treeControl = new NestedTreeControl<Menu_tree>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Menu_tree>();
 

  constructor(
          private _perfilservice: PerfilService,
          private formbuilder: FormBuilder,
          private _menuService: MenuService,
          private _seguridadService: SeguridadService
          )
  {
    this.perfilform = this.formbuilder.group({
      cve_perfil: 0,
      nombre: '',
      activo: true
    });
   
  }
  ngOnInit() {
    this.ObtenerListaTable(1);
    
  
   
  }
  OnSubmit(){
    const perfil = new Perfil(
      this.perfilform.controls.cve_perfil.value,
      this.perfilform.controls.nombre.value,
      true,
      this.perfilform.controls.activo.value,
      1
    );
    
    if (this.accion === 'A') {
      this._perfilservice.AgregarPerfil(perfil).subscribe(
        response => {
          console.log(response);
          this.perfilform.reset();
          this.ObtenerListaTable();

        }
        , error => {
          console.log(error);
        }

      );
    } else if (this.accion === 'E') {
      this._perfilservice.EditarPerfil(perfil).subscribe(
        response => {
          console.log(response);
          this.perfilform.reset();
          this.ObtenerListaTable();
        }
        ,error => {
          console.log(error);
        }
      );
    }
  }
  ObtenerListaTable(pagina= 1, longitud= 20, criterio = '') {
    this._perfilservice.ObtenerListaTabla(pagina, longitud, criterio).subscribe(
      response => {

      this.listTPerfil = response;
      }
      // tslint:disable-next-line: no-shadowed-variable
      , error => {
        console.log(error);
      }
    );
  }
  AbrirAgregar() {
    this.openform = true;
    this.nameAccion = 'Agegar nuevo';
    this.accionBoton = 'Agregar';
    this.accion = 'A';
    this._perfilservice.ObenerUltimoIndice().subscribe(
      response => {
        this.perfilform.controls.cve_perfil.setValue(response['respuesta']);
      }
      , error => {
        console.log(error);
      }

    );
    
  }
  AbrirEditar(cve_perfil, nombre, activo) {
    this.openform = true;
    this.nameAccion = 'Editar';
    this.accionBoton = 'Actualizar';
    this.accion = 'E';
    this.perfilform.controls.cve_perfil.setValue(cve_perfil);
    this.perfilform.controls.nombre.setValue(nombre);
    this.perfilform.controls.activo.setValue(activo);
    this.existePerfil = true;
    this.ObtenerMenuTree();
  }
  RegresaraTabla(){
    this.openform = false;
    this.perfilform.reset();
    this.existePerfil = false;
  }
  get P() { return this.perfilform.controls; }
  GuardarPerfil(cve_menu) {
    let cve_perfil = this.perfilform.controls.cve_perfil.value;
    this._seguridadService.AgregarMenuaPerfil(cve_perfil,cve_menu).subscribe(
    response => {
      console.log(response);
    },error => {
      console.log(error);
    }
    );
  }
  ObtenerMenuTree() {
  let ArrayS;
  this.dataSource.data = null;
  this._menuService.ObtenerTreeViewMenu().subscribe(
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
  
 
}

