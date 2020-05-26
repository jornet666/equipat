import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificacionesService } from '../../services/notificaciones.service';
import { Usuario } from '../models/usuario.models';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  /** Fechas de notificaciones */

  collectionfechas = { count: 10, data: [] };
  configfechas = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: this.collectionfechas.count
  };

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
  collection = { count: 60, data: [] };
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
    debugger;
    for (let i = 0; i < this.collectionfechas.count; i++) {
      this.collectionfechas.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }
    console.log(this.collectionfechas);
  }

  ngOnInit() {
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
  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  onItemSelectSucursal(item: any) {
    console.log(item);
  }
  onSelectAllSucursal(items: any) {
    console.log(items);
  }

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

  detallenumsolicitud() {
    swal.fire('Información', 'El número de solicitud debe de estar registrado en la base de datos móvil', 'info');
  }

  detallesucursal() {
    swal.fire('Información', 'Selecciona una sucursal para poder filtrar', 'info');
  }

  detalleproductos() {
    swal.fire('Información', 'Selecciona un producto para poder filtrar', 'info');
  }


  cargafiltros() {

  }

  cargaregistrospush() {
    this.spinner.show();
    this.service.cargaFiltrotodo().subscribe( resp => {
      console.log(resp);
      debugger;
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < resp; index++) {
        console.log('este es un ejemplo');
      }
      this.collection.data.push(
      );
      console.log(resp);
      this.spinner.hide();
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
