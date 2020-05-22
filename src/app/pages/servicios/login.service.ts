import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, bindCallback} from 'rxjs';

@Injectable()
export class LoginService {
    public url: string;
    constructor(public _httpClient: HttpClient){
        //this.url = 'https://renoenlineaapi.azurewebsites.net/api/site/test';
        this.url = '/api/site/siteLogin';
    }

    ValidarUsuario(usuarioV: string, passwordV: string) {
        //let usuarioValido: boolean;
        const body = {  usuario: usuarioV,
                        password: passwordV
                    };
        
        const header = new HttpHeaders().set('Content-Type', 'application/json');

        const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
        this._httpClient.post(this.url, body, {headers: header}).subscribe(
            response => {
                console.log(response);
            },
            error => {
                console.log(error);
            }
        );
       // return usuarioValido;
    }
}
