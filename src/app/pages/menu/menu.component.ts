import { Component, OnInit } from '@angular/core';
import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import {MenuService} from '../../services/menus.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Menu} from '../../models/menu.models';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { error } from 'protractor';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'
            ],
  providers: [MenuService]
})
export class MenuComponent implements OnInit {
  
   // Variables Globales
    nameAccion: string = 'Menú';
    accionBoton: string = '';
    selectedPortal: Portal<any>;
    componentPortal: ComponentPortal<MenuComponent>;
    listaMenuSelect: any;
    menuForm: FormGroup;
    listMenu;
    iconosVer: string[] = [];
    nMenu: any;
    accion: string;
    respuesta: any;
    openform: boolean = false;
    iconoE: string;
  constructor(private _menuService: MenuService,
              private formBuilder: FormBuilder
            ) {
                this.menuForm = this.formBuilder.group({
                  cve_idioma: 0,
                  cve_menu: 0,
                  cve_padre: 0,
                  nombre: '',
                  pagina: '',
                  imagen: '',
                  activo: true,
                  tooltip: '',
                  visible: true
                });

            }

  // Métodos
  ngOnInit() {
    this._menuService.ObtenerTreeViewMenu();
    this.ObtenerLista();
    this.getClassesAndIds();
    this.accion = '';
  }

  ValidarFormulario() {

  }
    ObtenerLista(pagina= 1, longitud= 20, criterio = '') {
      this._menuService.ObtenerListaTabla(pagina, longitud, criterio).subscribe(
        response => {
          this.listMenu = response;
        }
        // tslint:disable-next-line: no-shadowed-variable
        , error => {
          console.log(error);
        }
      );
    }
  AbrirAgregar() {
    this.ValidarFormulario();
    this.nameAccion = 'Agregar Menú';
    this.accionBoton = 'Agregar';
    this._menuService.ObenerUltimoIndice().subscribe(
      response => {
        this.menuForm.controls.cve_menu.setValue(response['respuesta']);
        this.LlenarListaMenu();
        this.openform = true;
      }
      , error => {
        console.log(error);
      }
    );
    this.accion = 'A';
    
  }
  AbrirEditar(cve_menu){
    this.nameAccion = 'Editar Menú';
    this.accionBoton = 'Actualizar';
    this.accion = 'E';
    this.LlenarListaMenu();
    this._menuService.ObtenerDetalleMenu(cve_menu).subscribe(
      response => {
        console.log(response);
        this.menuForm.controls.cve_menu.setValue(response['cve_menu']);
        this.menuForm.controls.cve_padre.setValue(response['cve_padremenu']);
        this.menuForm.controls.pagina.setValue(response['pagina']);
        this.menuForm.controls.imagen.setValue(response['imagen']);
        this.iconoE = response['imagen'];
        this.menuForm.controls.tooltip.setValue(response['tooltip']);
        this.menuForm.controls.activo.setValue(response['activo']);
        this.menuForm.controls.visible.setValue(response['visible']);
        this.menuForm.controls.nombre.setValue(response['nombre']);
        this.openform = true;
       
      }
      , error => {
          console.log(error);

        }
    );
  }
 
  OnSubmit() {
    
    const  menu = new Menu(
                0,
                this.menuForm.controls.cve_menu.value,
                this.menuForm.controls.cve_padre.value,
                this.menuForm.controls.nombre.value,
                this.menuForm.controls.pagina.value,
                this.menuForm.controls.imagen.value,
                this.menuForm.controls.activo.value,
                this.menuForm.controls.tooltip.value,
                this.menuForm.controls.visible.value,
          );
          
          
    if (this.accion === 'A') {
      
      this._menuService.AgregarMenu(menu).subscribe(
        response => {
            this.menuForm.reset();
            this.ObtenerLista();
          },
        error => {
          console.log(error);
        }
      );
    }
    else if (this.accion === 'E')
    {
      this._menuService.EditarrMenu(menu).subscribe(
        response => {
          this.menuForm.reset();
          this.ObtenerLista();
        }
        ,error => {
            console.log(error);
          }
        );
    }
  }
  getClassesAndIds() {
    console.log(document.styleSheets);
    
    var sheet = document.styleSheets.item(3);
    var rule, rules;
    var temp;

    rules = sheet['rules'];

    for (var j = 0; j < rules.length; j++) {
      if (rules[j]['selectorText']) {

        rule = rules[j]['selectorText'];
        temp = (rule).match(/\::befor\w+/g);
        if (temp) {
          let ic = ('' + rule ).replace('.', '');
          ic = ic.replace('::before', '');
          if(ic.length > 0){
            this.iconosVer.push(ic);
          }
          
          }
      }

    }
  }
  EscogerIcono(i){
    this.iconoE = i;
    this.menuForm.controls.imagen.setValue(i);
    console.log( this.menuForm.controls.imagen.value);
  }
  LlenarListaMenu() {

    this._menuService.ObtenerListaSelect().subscribe(
      response => {
        this.listaMenuSelect = response;
      }
      , error => {
        console.log(error);
      }
    );
  }
  RegresaraTabla() {
    this.openform = false;
  }
  get M() { return this.menuForm.controls; }
}
