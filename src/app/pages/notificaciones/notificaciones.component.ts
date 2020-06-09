import { Component, OnInit, OnDestroy } from '@angular/core';
import swal from 'sweetalert2';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Usuario } from '../../models/usuario.models';
import { CampaniasModel } from 'src/app/models/usuario.home';
import { UsuarioModel,ConfModel } from '../../models/usuario.home';
import {Campania} from '../../models/campania.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {MatDatepickerModule, MatDatepicker} from '@angular/material/datepicker'; 
import { DateAdapter } from '@angular/material';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css'],
  providers: [NotificacionesService]
})
export class NotificacionesComponent implements OnInit {

 /**TimePicker */
 time = {hour: 12, minute: 12};
 roomsFilter = {
    date: '',
    hour : ''
 }
 /**Termina timepicker */
  /**
   * Carga informacion estatica
   */

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  
  /** Fechas de notificaciones */
  contadorclientes = 0;
  contadorNotificaciones = 0;
  listNot = [];
  listConf = [];
  configfechas = { 
          id: 'custom',
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: 0
        }
  campanaAct: number;
  nameAccion: string;
  /**Variables correspondientes al formulario de notificaciones */
  FormNot: FormGroup;
  accionCam: string;
  /**Termina Variables de Notificaciones */
  /** OCULTAR O MOSTRAR */
  public listadetalle = true;
  public showdetale = true;
  public showusuarionotificaciones = false;
  public showcampania = false;
  public show = false;
  public showFechas= true;


  public buttonName: any = 'Show';
  municipiolista: any;
  /** Configuraciones para sucursal */
  dropdownListSucursal = [];
  selectedItemsSucursal = [];
  dropdownSettingsSucursal = {};
   /** Configuraciones para productos */
  dropdownListProductos = [];
  selectedItemsProductos = [];
  dropdownSettingsProductos = {};
  collection = { count: this.contadorclientes , data: [] };
  config = {
      id: 'custom',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    };

  public maxSize = 7;
  public directionLinks = true;
  public autoHide = false;
  public responsive = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };
  constructor(  private service: NotificacionesService
              , private formbuilder: FormBuilder
              , private spinner: NgxSpinnerService
            ) {
    this.FormNot = this.formbuilder.group({
                  Cve_campana: 0,
                  Nombre_campana: '',
                  Usuario_creo: sessionStorage.getItem('cve_usuario_nav').toString(),
                  Fecha_creacion: Date.now().toString(),
                  Sms:  false,
                  Notificacion: false,
                  Titulo: '',
                  Mensaje: '',
                  activo: true,
                  Personalizado: false
    });
   
   }

  ngOnInit() {
    /**
     * Informacion estatica
     */
    this.spinner.show();
    setTimeout(() => {
      
      this.spinner.hide();
    }, 5000);
    this.dropdownList = [
    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


    // /**
    //  * CARGA TODOS LOS FILTROS
    //  */
    
    this.service.cargaFiltros().subscribe( resp => {
      // tslint:disable-next-line: no-string-literal
      this.dropdownListSucursal = resp['listasucursal'];
      this.selectedItemsSucursal = [
      ];
      this.dropdownSettingsSucursal =  {
        singleSelection: false,
        idField: 'cvecatalogo',
        textField: 'descripcion',
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'Quitar selección',
        itemsShowLimit: 3,
        allowSearchFilter: false
      };
      // tslint:disable-next-line: no-string-literal
      this.dropdownListProductos = resp['listaproductos'];
      this.selectedItemsProductos = [
      ];
      this.dropdownSettingsProductos =  {
        singleSelection: false,
        idField: 'cvecatalogo',
        textField: 'descripcion',
        selectAllText: 'Seleccionar todo',
        unSelectAllText: 'Quitar selección',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
    
    },
    error => {
      
      console.log(error);
    });
  this.CargarTablaNotificaciones();
  
  }

  /**
   * EVENTO DE LA TABLA PARA CAMPAÑAS
   */
  onPageChangeFechas(event) {
    console.log(event);
    this.configfechas.currentPage = event;
  }

  /**
   * EVENTO DE LA TABLA PARA CLIENTES
   */
  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  /**
   * EVENTOS COMBOS ESTATICOS
   */

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  /**
   * EVENTOS DEL COMBO SUCURSAL
   */
  onItemSelectSucursal(item: any) {
    console.log(item);
  }
  onSelectAllSucursal(items: any) {
    console.log(items);
  }
  /**
   * EVENTOS DEL COMBO PRODUCTO
   */
  onItemSelectProductos(item: any) {
    console.log(item);
  }
  onSelectAllProductos(items: any) {
    console.log(items);
  }


  toggle(activar: number) {
    if (activar === 0) {
      this.show = false;
    } else {
      this.show = true;
    }
  }

  /** Agregar campanias */
  agregarcampania() {
    this.listadetalle = false;
    this.showcampania = true;
    this.ObtnerUltimoRegistro();
    this.accionCam = 'A';
    this.nameAccion = 'AGREGAR';
  }
  editarCampania(cve_campana: number){
    this.ObtenerDetalleCamp(cve_campana);
    this.ObtenerDetalleClientes(cve_campana);
    this.ObtenerListaFechasCamp(cve_campana);
    this.listadetalle = false;
    this.showcampania = true;
    this.showFechas = false;
    this.showusuarionotificaciones = true;
    this.accionCam = 'E';
    this.nameAccion = "EDITAR";
  }
  RegresaraTabla(){
    this.listadetalle = true;
    this.showcampania = false;
    this.showusuarionotificaciones = false;
  }
  ObtenerDetalleCamp(cve_campana: number){
      this.campanaAct = cve_campana;
      this.service.ObtnerDetalleCamp(cve_campana).subscribe(
      r => {
        console.log(r);
        this.FormNot.controls.Cve_campana.setValue(r['Cve_campana']);
        this.FormNot.controls.Mensaje.setValue(r['Mensaje']);
        this.FormNot.controls.Titulo.setValue(r['Titulo']);
        this.FormNot.controls.Nombre_campana.setValue(r['Nombre_campana']);
        this.FormNot.controls.Sms.setValue(r['Sms'].toLowerCase() === 'true');
        this.FormNot.controls.activo.setValue(r['activo'].toLowerCase() === 'true');
        this.FormNot.controls.Notificacion.setValue(r['Notificacion'].toLowerCase() === 'true');
        this.FormNot.controls.Personalizado.setValue(r['Personalizado'].toLowerCase() === 'true');
       
      },
      e => {
        console.log(e);

      });
  }
  ObtenerDetalleClientes(cve_campana: Number){
    this.collection.data = [];
    this.service.CargaTablaClientes(cve_campana).subscribe(
      r => {
          console.log(r);
          
          for (const item in r) {
              this.contadorclientes++;
              const data = new UsuarioModel();
              data.cveusuario = r[item].cveregistro;
              data.nombre = r[item].nombre;
              data.sucursal = r[item].sucursal;
              data.existe = Number.parseInt(r[item].Existe, 10) === 1 ;
              this.collection.data.push(data);
            }

      },
      e => {
          console.log(e);

      }
    );
  }

  /**
   * INICIA
   * Alertas
   */

  detallenumsolicitud() {
    swal.fire('Información', 'El número de solicitud debe de estar registrado en la base de datos móvil', 'info');
  }

  detallesucursal() {
    swal.fire('Información', 'Selecciona una sucursal para poder filtrar', 'info');
  }

  detalleproductos() {
    swal.fire('Información', 'Selecciona un producto para poder filtrar', 'info');
  }

  detallegenerico() {
    swal.fire('Información', 'No disponible por el momento', 'info');
  }

  /**
   * TERMINA
   * alertas
   */


  cargafiltros() {

  }

  /**
   * INICIA
   * Se encarga de mostrar todos los clientes
   */
  cargaregistrospush() {
    
    this.campanaAct = this.FormNot.controls.Cve_campana.value;

    this.service.CargaTablaClientes(this.campanaAct).subscribe( resp => {
      console.log(resp);
      // tslint:disable-next-line: forin
      for (const item in resp) {
        this.contadorclientes++;
        const data = new UsuarioModel();
        data.cveusuario = resp[item].cveregistro;
        data.nombre = resp[item].nombre;
        data.sucursal = resp[item].sucursal;
        data.existe = Number.parseInt(resp[item].Existe, 10) === 1 ? true : false;
        this.collection.data.push(data);
      }
      
    });
  }
  CargarTablaNotificaciones(){
   
    this.service.CargaTablanot(1, 10, '').subscribe(
      response =>
        {
          for (const item in response)
            {
              const data = new CampaniasModel();
              data.cvecampania = response[item].Cve_campana;
              data.nombrecampania = response[item].Nombre_campana;
              data.fechacampania = response[item].Fecha_creacion;
              data.quienlohizo = response[item].Nombre_usuario
              data.estatus = response[item].activo;
              this.listNot.push(data);
          }
          this.configfechas = {
                  id: 'custom',
                  itemsPerPage: 10,
                  currentPage: 1,
                  totalItems: response[0].totalRegistros
          }
          this.spinner.hide();
        },
      error => 
        {
          console.log(error);
          this.spinner.hide();
        }
    );
  }
  GuardarCampania(){
    
    const camp = new Campania(
                this.FormNot.controls.Cve_campana.value,
                this.FormNot.controls.Nombre_campana.value,
                this.FormNot.controls.Usuario_creo.value,
                '',
                this.FormNot.controls.Fecha_creacion.value,
                this.FormNot.controls.Sms.value ? 1 : 0,
                this.FormNot.controls.Notificacion.value ? 1 : 0,
                this.FormNot.controls.Titulo.value,
                this.FormNot.controls.Mensaje.value,
                this.FormNot.controls.activo.value ? 1 : 0,
                this.FormNot.controls.Personalizado.value ? 1 : 0
                );
      
      
    if (this.accionCam === 'A') {
      
      this.service.AgregarCampania(camp).subscribe(
        response => 
          {
            console.log(response);
            if(Number.parseInt(response['estatus_r'],10) > 0)
              {
                swal.fire('¡Súper!',response['respuesta'] , 'success');
                this.showusuarionotificaciones = true;
              }
            else  
              {
                swal.fire('¡Ops!',response['respuesta'] , 'error');
              }
          }
        ,error =>
          {
            console.log(error);
            
          }
      );
    }
    else if (this.accionCam === 'E'){
      this.service.EditarCampana(camp).subscribe(
        response => 
          {
            console.log(response);
            if(Number.parseInt(response['estatus_r'],10) > 0)
              {
                swal.fire('¡Súper!',response['respuesta'] , 'success');
                this.showusuarionotificaciones = true;
              }
            else  
              {
                swal.fire('¡Ops!',response['respuesta'] , 'error');
              }
          }
        ,error =>
          {
            console.log(error);
            
          }
      );
    }
   
  }
  ObtenerTablaClientes(){
    
  }
  ObtnerUltimoRegistro(){

    this.service.ObtenerUltimoRegistro().subscribe(
      response =>
        {
          console.log(response);
          this.FormNot.controls.Cve_campana.setValue(response['respuesta']);
          
        }
      ,error =>
        {

        }
    );
  }
  AgregarCliente(cve_cliente){
    this.campanaAct = this.FormNot.controls.Cve_campana.value;
    this.service.AClienteACampania(this.campanaAct, cve_cliente).subscribe(
      response =>
        {

          console.log(response);
          if(Number.parseInt(response["etatus"], 10) > 0) {
            alert('Agregado');
          }
        }
      , error =>
        {
          console.log(error);

        }
    );
  }
  AgregarFechaEnvio(){
    this.roomsFilter.hour =  (this.time.hour.toString().length === 1 ? '0' + this.time.hour : this.time.hour)
                              + ':'
                              + (this.time.minute.toString().length === 1 ? '0' + this.time.minute : this.time.minute)
    const cve_campana = this.FormNot.controls.Cve_campana.value;
    const fecha = this.roomsFilter.date + ' ' + this.roomsFilter.hour;
    this.service.AgregarFechaCampania(cve_campana, fecha).subscribe(
      r => 
        {
          console.log(r);

          this.ObtenerListaFechasCamp(cve_campana);
          
        }
      ,e => 
        {
          console.log(e);
          
        }
    );    
  }
  EliminarFechaEnvio(cveConf: number, cveCamp: number){
    this.service.EliminarFechaCampania(cveConf, cveCamp).subscribe(
      r => {
        console.log(r);
        this.ObtenerListaFechasCamp(cveCamp);
      }
      , e =>{

      }
    );

  }
  ObtenerListaFechasCamp(cve_campana: number){
    this.listConf = [];
    this.service.ObtenerListaFechasCamnia(cve_campana).subscribe(
      r => {
     
        for (const item in r)
            {
              const data = new ConfModel();
              data.cvecampania = r[item].Cve_campana;
              data.cveconf = r[item].Cve_confi;
              data.fechacampania = r[item].Fecha;
              data.horacampania = r[item].Hora;
              data.enviado = r[item].Enviado;
              this.listConf.push(data);
          }
      }
    ,e => {
      console.log(e);
      
    }
    );

    
  }
  public onDate(event): void {

      let fecha = new Date(this.roomsFilter.date).toLocaleDateString('ko-KR').toString();
      let fSplit = fecha.replace(/\s/g, '').split('.');
      fecha = fSplit[0] + '-'
            + (fSplit[1].length === 1 ? '0' + fSplit[1] : fSplit[1]) + '-'
            + (fSplit[2].length === 1 ? '0' + fSplit[2] : fSplit[2]);
      this.roomsFilter.date = fecha;
  }

  
  /**
   * TERMINA
   * Se encarga de mostrar todos los clientes
   */



  /**
   * INICIA
   * Validaciones de campos
   */
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  /**
   * TERMINA
   * Validaciones de campos
   */

 
}
