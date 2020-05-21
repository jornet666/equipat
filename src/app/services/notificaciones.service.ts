import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  constructor(private http: HttpClient) { }
  /**
   * Este metodo obtiene todos los registros de los clientes que estan registrados en la plataforma movil
   */
  cargaFiltrotodo() {
    const body = {

    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.url + 'clientespush', body, httpOptions);
  }

  /**
   * Este metodo obtiene todos los registros filtrados
   */

  cargaFiltrado() {
    const body = {

    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(environment.url + 'loginuser', body, httpOptions);
  }
}
