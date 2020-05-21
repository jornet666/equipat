import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  public show = false;
  public buttonName: any = 'Show';

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
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
    for (let i = 0; i < this.collection.count; i++) {
      this.collection.data.push(
        {
          id: i + 1,
          value: 'items number ' + (i + 1)
        }
      );
    }
  }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [

    ];
    this.dropdownSettings =  {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Quitar selección',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    //  /** spinner starts on init */
    // this.spinner.show();
    // setTimeout(() => {
    //    /** spinner ends after 5 seconds */
    //    this.spinner.hide();
    //  }, 5000);
  }
  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
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

  cargaregistrospush() {
    // tslint:disable-next-line: no-debugger
    debugger;
    this.spinner.show();
    this.service.cargaFiltrotodo().subscribe( resp => {
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
