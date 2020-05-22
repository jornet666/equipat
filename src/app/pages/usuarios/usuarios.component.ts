import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsuarioService} from '../servicios/usuarios.service';
import {SeguridadService} from '../servicios/seguridad.service';
import {PerfilService} from '../servicios/perfiles.service';
import {Usuario} from '../models/usuario.models';
import { error } from 'protractor';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsuarioService, SeguridadService, PerfilService]
})
export class UsuariosComponent implements OnInit {
  listTUsuario: any;
  listaUsuarioSelect: any;
  usuarioform: FormGroup;
  openform: boolean = false;
  accionBoton: string = '';
  nameAccion: string = '';
  accion: string= '';
  existeUsuario: boolean = false;
  constructor(
              private _usuarioService: UsuarioService,
              private formbuilder: FormBuilder,
              private _seguridadService: SeguridadService,
              private _perfilService: PerfilService
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
    this.ObtenerListaTable();
    
  }
  OnSubmit() {
    let usuario = new Usuario(
        this.usuarioform.controls.cve_usuario.value,
        this.usuarioform.controls.password.value,
        this.usuarioform.controls.cve_perfil.value,
        0,
        0,
        0,
        this.usuarioform.controls.cuentabloqueada.value,
        this.usuarioform.controls.activo.value,
        0,
        0,
        0,
        0,
        this.usuarioform.controls.nombre.value,
        0,
        this.usuarioform.controls.email.value,
        this.usuarioform.controls.telefono.value,
        this.usuarioform.controls.email_copias.value
    );
    if (this.accion === 'A') {
      this._usuarioService.AgregarUsuario(usuario).subscribe(
        response => {
          console.log(response);
          this.usuarioform.reset();
          this.ObtenerListaTable();

        }
        , error => {
          console.log(error);
        }

      );
    } else if (this.accion === 'E') {
      this._usuarioService.EditarUsuario(usuario).subscribe(
        response => {
          console.log(response);
          this.usuarioform.reset();
          this.ObtenerListaTable();
        }
        ,error => {
          console.log(error);
        }
      );
    }
  }
  ObtenerListaTable(pagina= 1, longitud= 20, criterio = '') {
    this._usuarioService.ObtenerListaTabla(pagina, longitud, criterio).subscribe(
      response => {
        console.log(response);
        this.listTUsuario = response;
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
    this._usuarioService.ObenerUltimoIndice().subscribe(
      response => {
        this.usuarioform.controls.cve_usuario.setValue(response['respuesta']);
      }
      , error => {
        console.log(error);
      }

    );
    
  }
  AbrirEditar(cve_usuario) {
    this.openform = true;
    this.nameAccion = 'Editar';
    this.accionBoton = 'Actualizar';
    this.accion = 'E';
    this.LlenarListaPerfiles();
    this._usuarioService.ObtenerDetallUsuario(cve_usuario).subscribe(
      response => {

        this.usuarioform.controls.cve_usuario.setValue(response['cve_usuario']);
        this.usuarioform.controls.password.setValue(response['password']);
        this.usuarioform.controls.cve_perfil.setValue(response['cve_perfil']);
        this.usuarioform.controls.cuentabloqueada.setValue(response['cuentabloqueada']);
        this.usuarioform.controls.nombre.setValue(response['nombre']);
        this.usuarioform.controls.activo.setValue(response['activo']);
        this.usuarioform.controls.email.setValue(response['email']);
        this.usuarioform.controls.email_copias.setValue(response['email_copias']);
        this.usuarioform.controls.telefono.setValue(response['telefono']);
        this.openform = true;
        this.existeUsuario = true;
      }
      , error => {
          console.log(error);

        }
    );
  }
  RegresaraTabla() {
    this.openform = false;
    this.usuarioform.reset();
    this.existeUsuario = false;
  }
  get P() { return this.usuarioform.controls; }
  LlenarListaPerfiles(){
    this._perfilService.ObtenerListaSelect().subscribe(
      response => {
        
        
         this.listaUsuarioSelect = response;
      }
      ,error => {
          console.log(error);
      }

    );
  }
}
