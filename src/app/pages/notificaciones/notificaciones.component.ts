import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Usuario } from '../../models/usuario.models';
import { CampaniasModel } from 'src/app/models/usuario.home';
import { UsuarioModel } from '../../models/usuario.home';
import {Campania} from '../../models/campania.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

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
  configfechas = {
          id: 'custom',
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: 0
        }
  campanaAct: number;
  /** Variables correspondientes al formulario de notificaciones */
  FormNot: FormGroup;

  /** Termina Variables de Notificaciones */
  /** OCULTAR O MOSTRAR */
  public listadetalle = true;
  public showdetale = true;
  public showusuarionotificaciones = false;
  public showcampania = false;
  public show = false;


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
  constructor(private service: NotificacionesService, private formbuilder: FormBuilder,) {
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
        },
      error =>
        {
          console.log(error);
        }
    );
  }
  GuardarCampania(){
    let camp = new Campania(
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
    this.service.AgregarCampania(camp).subscribe(
      response =>
        {
          console.log(response);
          if(Number.parseInt(response['estatus_r']) > 0)
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
  AgregarCliente(Cve_campana,cve_cliente){
    this.service.AClienteACampania(Cve_campana,cve_cliente).subscribe(
      response =>
        {
          console.log(response);

        }
      , error =>
        {
          console.log(error);

        }
    );
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
