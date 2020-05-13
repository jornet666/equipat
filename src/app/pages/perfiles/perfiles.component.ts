import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  displayedColumns: string[] = ['cve_perfil','nombre','puedevertodo','activo'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
}
  export interface PeriodicElement {
    cve_perfil:number
    nombre:string,
    puedevertodo:string,
    activo:string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {cve_perfil: 1, nombre: 'Alfredo Rodiguez', puedevertodo: 'No', activo: 'Si'},
  {cve_perfil: 2, nombre: 'EriKa Martines', puedevertodo: 'No', activo: 'Si'},
  {cve_perfil: 3, nombre: 'Joaquín Mendoza', puedevertodo: 'No', activo: 'Si'}
];
