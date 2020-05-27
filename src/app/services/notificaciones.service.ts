import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public urlBase: string;
  public url: string;

  constructor(private http: HttpClient) {
    this.urlBase = '/api/site/';
   }

   /**
    * Carga todos los filtros para la busqueda
    */
  cargaFiltros() {
    this.url = this.urlBase + 'filtrospush';
    const body = {
    };
    const httpOptions = {
                headers: new HttpHeaders({
                'Content-Type':  'application/json'
                })
                };
    return this.http.post(this.url, JSON.stringify(body), httpOptions);
  }



  /**
   * Este metodo obtiene todos los registros de los clientes que estan registrados en la plataforma movil
   */
  cargaFiltrotodo() {

    this.url = this.urlBase + 'clientespush';
    const body = {
    };
    const httpOptions = {
                headers: new HttpHeaders({
                'Content-Type':  'application/json'
                })
                };
    return this.http.post(this.url, JSON.stringify(body), httpOptions);
  }

  /**
   * Este metodo obtiene todos los registros filtrados
   */

  cargaFiltradoSeleccion() {
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
