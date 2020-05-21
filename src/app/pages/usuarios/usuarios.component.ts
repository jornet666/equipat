import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PerfilService} from '../servicios/perfiles.service';
import {SeguridadService} from '../servicios/seguridad.service';
import {UsuarioModel} from '../models/usuario.models';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [PerfilService, SeguridadService]
})
export class UsuariosComponent implements OnInit {
  listTPerfil: any;
  usuarioform: FormGroup;
  openform: boolean = false;
  accionBoton: string = '';
  nameAccion: string = '';
  accion: string= '';
  existePerfil: boolean = false;
  constructor(
              private _perfilservice: PerfilService,
              private formbuilder: FormBuilder,
              private _seguridadService: SeguridadService
            ) { 
              this.usuarioform = this.formbuilder.group({
                   cve_usuario:  0,
                   password: '',
                   cve_perfil:  0,
                   cve_menu:  0,
                   num_empleado:  0,
                   cve_seguridad:  0,
                   cuentabloqueada: false,
                   activo: true,
                   cve_tipopassword:  0,
                   periodocambiap:  0,
                   cambiap:  0,
                   veceslogin:  0,
                   nombre: '',
                   cve_sucursal:  0,
                   email: '',
                   telefono:  0,
                   email_copias: ''
              });

            }

  ngOnInit() {
  }
  OnSubmit(){

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
        this.usuarioform.controls.cve_perfil.setValue(response['respuesta']);
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
    this.usuarioform.controls.cve_perfil.setValue(cve_perfil);
    this.usuarioform.controls.nombre.setValue(nombre);
    this.usuarioform.controls.activo.setValue(activo);
    this.existePerfil = true;
    
  }
  RegresaraTabla(){
    this.openform = false;
    this.usuarioform.reset();
    this.existePerfil = false;
  }
  get P() { return this.usuarioform.controls; }
  GuardarPerfil(cve_menu) {
    let cve_perfil = this.usuarioform.controls.cve_perfil.value;
    this._seguridadService.AgregarMenuaPerfil(cve_perfil,cve_menu).subscribe(
    response => {
      console.log(response);
    },error => {
      console.log(error);
    }
    );
  }
}
