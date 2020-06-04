import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu.models';
import { ListRange } from '@angular/cdk/collections';
import { error } from 'protractor';
import { runInThisContext } from 'vm';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class MenuService {
    public urlBase: string;
    public url: string;
    respuesta: any;
    menuTreeView: Menu_tree[] = [];
    nivelesSubmenu = 5;
    constructor(public _httpClient: HttpClient)
                {
                    console.log("menu service");
                this.urlBase = environment.url + '/api/site/';
                }

    ObtenerMenuPerfil(cve_perfil) {

        this.url += '';
        const body = {  cve_perfil: cve_perfil
                    };
        const httpOptions = {
                        headers: new HttpHeaders({
                        'Content-Type':  'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('token')
                        })
                        };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
        
    }

    ObenerUltimoIndice() {
        this.url = this.urlBase + 'UltimoRegistro';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, '', httpOptions);
       
    }
    AgregarMenu(menu: Menu) {
        this.url = this.urlBase + 'RegistroMenu';
        const body = JSON.stringify(menu);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    EditarrMenu(menu: Menu) {
        this.url = this.urlBase + 'RegistroMenuUpdate';
        
        const body = JSON.stringify(menu);
        console.log(body);
        
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    ObtenerListaTabla(pagina, longitud, criterios = '') {
        this.url = this.urlBase + 'ListadoMenus';
        const body = {
                paginacion: pagina,
                longitudPagina: longitud,
                criterio: criterios
        };
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
    ObtenerListaSelect(){
        this.url = this.urlBase + 'ListadoMenusSelect';
        console.log(this.url);
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    ObtenerDetalleMenu(cve_menuC){
        this.url = this.urlBase + 'RegistroMenuDetalle';
        console.log(this.url);
        const body = JSON.stringify({cve_menu: cve_menuC});
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    // tslint:disable-next-line: no-unused-expression

    ObtenerTreeViewMenu(){
        this.menuTreeView = [];
        let ArrayS;
        
        const body = {
            
    };
        this.url = this.urlBase + 'ObtenerListaTreeM';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    
    }
    GetTreeView(): Menu_tree[]{
        return this.menuTreeView;
    }
    SetTreeView(menu: Menu_tree[]){
    this.menuTreeView = menu;
    }
    CrearEncabezadoTreeView(mt:Menu_tree){
        this.menuTreeView.push(mt);
    }
    CrearCuerpoTreeView(mt:Menu_tree, padre:number){
    const menus = this.menuTreeView.find(({ cve_menu }) => cve_menu === padre);
    if (menus) {
        menus.children.push(mt);
    } else {
        let i = 0;
        var menuN: Menu_tree[];
        this.menuTreeView.forEach(element => {

            if (element.cve_menu !== padre) {
                menuN = element.children;
                if (menuN) {
                    menuN.forEach(element2 => {
                        if (element2.cve_menu !== padre) {
                            menuN = element2.children;
                            if (menuN) {
                                menuN.forEach(element3 => {
                                    if (element3.cve_menu !== padre) {
                                        menuN = element3.children;
                                    } else {
                                        element3.children.push(mt);
                                    }
                                });
                            }
                        } else {
                            element2.children.push(mt);
                        }
                    });
                }
            } else{
                element.children.push(mt);
            }

        });
    }
    }
    ObtenerTreeViewMenuAsignados(){
        this.menuTreeView = [];
        let ArrayS;
        const body = {
            
            };
            console.log("entra tree");
            
        this.url = this.urlBase + 'ObtenerListaTreeM';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    
    }
}

export class Menu_tree {
      public cve_menu: number;
      public nombre: string;
      public icono: string;
      public pagina: string;
      public existe: string;
      public children?: Menu_tree[];

}

    