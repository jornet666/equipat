import { Component, OnInit } from '@angular/core';
import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal'; 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor() { }
  selectedPortal: Portal<any>;
  componentPortal: ComponentPortal<MenuComponent>;
  
  ngOnInit() {
  
  }

}
