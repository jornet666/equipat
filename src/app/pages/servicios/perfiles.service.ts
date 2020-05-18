import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Perfil} from '../models/perfil.models';

@Injectable()
export class PerfilService {
    public urlBase: string;
    public url: string;
    respuesta: any;
    constructor(public _httpClient: HttpClient
                )
                {
                    this.urlBase = '/api/site/';
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
    AgregarMenu(perfil: Perfil) {
        this.url = this.urlBase + 'RegistroPerfil';
        const body = JSON.stringify(perfil);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    EditarrPerfil(perfil: Perfil) {
        this.url += 'EditarPerfil';
        console.log(this.url);
        const body = JSON.stringify(perfil);
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
        this.url = this.urlBase + 'ListadoPerfil';
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
        return this._httpClient.post(this.url, JSON.stringify(body), httpOptions);
    }
    ObtenerDetallPerfil(cve_perfilC) {
        this.url = this.urlBase + 'RegistroPerfilDetalle';
        const body = JSON.stringify({cve_perfil: cve_perfilC});
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    ObtenerListaSelect(){
        this.url = this.urlBase + 'ListadoPerfilsSelect';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json'
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
}
