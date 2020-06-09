import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, bindCallback} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {
    public url: string;
    public token: string;
    constructor(public _httpClient: HttpClient){
        //this.url = 'https://renoenlineaapi.azurewebsites.net/api/site/test';

            this.url = environment.url + '/api/login/siteLogin';
            //this.url = '/api/login/siteLogin';
    }

    ValidarUsuario(usuarioV: string, passwordV: string): Observable<any> {

        //let usuarioValido: boolean;
        const body = {  usuario: usuarioV,
                        password: passwordV
                    };

        //const header = new HttpHeaders().set('Content-Type', 'application/json');
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Access-Control-Allow-Origin': '*'

            })
            };
       // const httpOptions = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
        return this._httpClient.post(this.url, body, httpOptions);
       // return usuarioValido;
    }
   
}
