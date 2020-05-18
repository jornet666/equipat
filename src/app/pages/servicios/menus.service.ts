import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Menu} from '../models/menu.models';

@Injectable()
export class MenuService {
    public urlBase: string;
    public url: string;
    respuesta: any;
    constructor(public _httpClient: HttpClient
                )
                {
                this.urlBase = '/api/site/';
                }

    ObtenerMenuPerfil(cve_perfil) {

        this.url += '';
        const body = {  cve_perfil: cve_perfil
                    };
        const httpOptions = {
                        headers: new HttpHeaders({
                        'Content-Type':  'application/json'
                        })
                        };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
        
    }

    ObenerUltimoIndice() {
        this.url = this.urlBase + 'UltimoRegistro';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, '', httpOptions);
       
    }
    AgregarMenu(menu: Menu) {
        this.url = this.urlBase + 'RegistroMenu';
        const body = JSON.stringify(menu);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    EditarrMenu(menu: Menu) {
        this.url += 'RegistroMenuUpdate';
        console.log(this.url);
        const body = JSON.stringify(menu);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        this._httpClient.post(this.url, body, httpOptions).subscribe(
        result => {
        console.log(result);
        },
        error => {
        console.log(error);
        });
        return this.respuesta;
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
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url,JSON.stringify(body), httpOptions);
    }
    ObtenerListaSelect(){
        this.url = this.urlBase + 'ListadoMenusSelect';
        console.log(this.url);
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
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
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
}
