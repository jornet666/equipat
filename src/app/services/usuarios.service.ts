import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Usuario } from '../models/usuario.models';

@Injectable()
export class UsuarioService {
    public urlBase: string;
    public url: string;
    respuesta: any;
    constructor(public _httpClient: HttpClient
                )
                {
                    this.urlBase = '/api/site/';
                }

    ObenerUltimoIndice() {
        this.url = this.urlBase + 'UltimoRegistroU';
        const body = '';
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, '', httpOptions);

    }
    AgregarUsuario(Usuario: Usuario) {
        this.url = this.urlBase + 'RegistroUsuario';
        const body = JSON.stringify(Usuario);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
    EditarUsuario(Usuario: Usuario) {
        this.url = this.urlBase + 'RegistroUpdate';
        console.log(this.url);
        const body = JSON.stringify(Usuario);
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
         
    }
    ObtenerListaTabla(pagina, longitud, criterios = '') {
        this.url = this.urlBase + 'ListadoUsuarios';
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
    ObtenerDetallUsuario(cve_UsuarioC) {
        this.url = this.urlBase + 'UsuarioDetalle';
        const body = JSON.stringify({cve_Usuario: cve_UsuarioC});
        const httpOptions = {
                    headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                    })
                    };
        return this._httpClient.post(this.url, body, httpOptions);
    }
   
}
