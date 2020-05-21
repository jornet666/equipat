import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, bindCallback} from 'rxjs';


@Injectable()
export class SeguridadService {
    public url: string;
    urlBase: string;
    constructor(public _httpClient: HttpClient)
        {
            //this.url = 'https://renoenlineaapi.azurewebsites.net/api/site/test';
            this.urlBase = '/api/site/';
        }
    AgregarMenuaPerfil(cve_perfilM, cve_menuM){
        this.url = this.urlBase + 'AgregaAccesoMenuPerfil';
        const body = {
            cve_perfil: cve_perfilM,
            cve_menu: cve_menuM
        };
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
    ObtnerMenuPorPerfil(cve_perfilM){
        this.url = this.urlBase + 'ObtLTreePerfil';

        const body = {
            cve_perfil: cve_perfilM

        };
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
}
