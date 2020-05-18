import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Perfil} from '../models/perfil.models';
import {PerfilService} from '../servicios/perfiles.service';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css'],
  providers: [PerfilService]
})
export class PerfilesComponent implements OnInit {

  listTPerfil: any;
  perfilform: FormGroup;
  openform: boolean = false;
  accionBoton: string = '';
  nameAccion: string = '';
  constructor(private _perfilservice: PerfilService, private formbuilder: FormBuilder)
  {
    this.perfilform = this.formbuilder.group({
      cve_perfil: 0,
      nombre: '',
      pudevertodo:1,
      activo: true
    });
  }
  ngOnInit() {
    this.ObtenerListaTable(1);
  }
  OnSubmit(){

  }
  ObtenerListaTable(pagina= 1, longitud= 20, criterio = '') {
    this._perfilservice.ObtenerListaTabla(pagina, longitud, criterio).subscribe(
      response => {
        console.log(response);
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
    this._perfilservice.ObenerUltimoIndice().subscribe(
      response => {
        this.perfilform.controls.cve_perfil.setValue(response['respuesta']);
      }
      , error => {
        console.log(error);
      }

    );

  }
  AbrirEditar(cve_perfil){

  }
  RegresaraTabla(){
    this.openform = false;
  }
}

