
import { Component, OnInit, ChangeDetectorRef, OnDestroy, Injectable, ViewEncapsulation} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, Routes} from '@angular/router';
import {MatTreeNodeDef} from '@angular/material';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
@Injectable()
export class SidenavComponent implements OnInit {
  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher
  ){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this.listaModulos = 
  }

  //Variables
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  listaAcceso: Routes ;
  menuItems: any[];

  ngOnInit() {
    this.ObtenerLista();
  
  }
  ngAfterViewInit() {
  }

ObtenerLista() {
  this.listaAcceso = [];

}



}// Termina clase

export interface ListaMenu {
  label: string;
  nombre: string;

}


export interface NavItem {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: NavItem[];
}