import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Perfil} from '../models/perfil.models';
import { environment } from 'src/environments/environment.prod';


@Injectable()
export class PerfilService {
    public urlBase: string;
    public url: string;
    respuesta: any;
    constructor(public _httpClient: HttpClient
                
                )
                {
                    //this.urlBase = environment.url + '/api/site/';
                    this.urlBase = '/api/site/';
                }

    ObenerUltimoIndice() {
        this.url = this.urlBase + 'UltimoRegistroP';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, '', httpOptions);

    }
    AgregarPerfil(perfil: Perfil) {
        this.url = this.urlBase + 'RegistroPerfil';
        const body = JSON.stringify(perfil);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    EditarPerfil(perfil: Perfil) {
        this.url = this.urlBase + 'RegistroPerfilUpdate';
        console.log(this.url);
        const body = JSON.stringify(perfil);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
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
        
        this.url = this.urlBase + 'ListadoPerfil';
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
    ObtenerDetallPerfil(cve_perfilC) {
        this.url = this.urlBase + 'RegistroPerfilDetalle';
        const body = JSON.stringify({cve_perfil: cve_perfilC});
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    ObtenerListaSelect(){
        this.url = this.urlBase + 'ListadoPerfilSelect';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
}
