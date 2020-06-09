import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, bindCallback} from 'rxjs';
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class SeguridadService {
    public url: string;
    urlBase: string;
    constructor(public _httpClient: HttpClient, private router: Router)
        {
            
            //this.url = 'https://renoenlineaapi.azurewebsites.net/api/site/test';
            this.urlBase = environment.url + '/api/site/';
            //this.urlBase = '/api/site/';
            
        }
    AgregarMenuaPerfil(cve_perfilM, cve_menuM){ 
        this.url = this.urlBase + 'AgregaAccesoMenuPerfil';
        const body = {
            cve_perfil: cve_perfilM,
            cve_menu: cve_menuM
        };
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
    ObtnerMenuPorPerfil(cve_perfilM){
        this.url = this.urlBase + 'ObtenerListaTreePerfil';

        const body = {
            cve_perfil: cve_perfilM

        };
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
    ValidarToken(){
        
        this.url = this.urlBase + 'ValidarToken';
        const body = {};
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions).subscribe(
            response => {
                console.log('correcto', response);
            },
            error => {
                console.log('Incorrecto', error);
                this.router.navigate(['/login']);
            }
        );
    }

}
