import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Usuario } from '../models/usuario.models';
import { CampaniasModel } from 'src/app/models/usuario.home';
import { UsuarioModel } from '../../models/usuario.home';


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
  collectionfechas = { count: 1, data: [] };
  configfechas = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collectionfechas.count
  };
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
  constructor(private spinner: NgxSpinnerService, private service: NotificacionesService) {
    /**
     * CARGA TODAS LAS CAMPAÑAS CREADAS
     */
    for (let i = 0; i < this.collectionfechas.count; i++) {
      const model = new CampaniasModel();
      model.cvecampania = '1';
      model.nombrecampania = 'mi primer capaña'.toUpperCase();
      model.horacampania = '10:00 AM';
      model.fechacampania = '12- abril - 2020';
      model.quienlohizo = 'TEst'.toUpperCase();
      model.estatus = true;
      this.collectionfechas.data.push(
        model
      );
    }
    console.log(this.collectionfechas);
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


    /**
     * CARGA TODOS LOS FILTROS
     */
    this.spinner.show();
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
      this.spinner.hide();
    });

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
    this.showusuarionotificaciones = true;
    this.showcampania = true;
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
    this.spinner.show();
    this.service.cargaFiltrotodo().subscribe( resp => {
      console.log(resp);
      // tslint:disable-next-line: forin
      for (const item in resp) {
        this.contadorclientes++;
        const data = new UsuarioModel();
        data.cveusuario = resp[item].cveregistro;
        data.nombre = resp[item].nombre;
        data.sucursal = resp[item].sucursal;
        this.collection.data.push(data);
      }
      this.spinner.hide();
    });
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
