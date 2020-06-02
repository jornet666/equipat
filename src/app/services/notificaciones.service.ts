import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Campania} from '../models/campania.model';
import { LoginComponent } from '../pages/login/login.component';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public urlBase: string;
  public url: string;

  constructor(private http: HttpClient) {
    this.urlBase = environment.url + '/api/site/';
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
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
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
                'Content-Type':  'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('token')
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
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return this.http.post(environment.url + 'loginuser', body, httpOptions);
  }
  CargaTablanot(pagina = 1, longitud = 10, crit = '') {
    this.url = this.urlBase + 'ObtenertblNot';
    const body = {
      paginacion: pagina,
      longitudPagina: longitud,
      criterio: crit
    };
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        })
    };
    return this.http.post(this.url , body, httpOptions);
  }
  AgregarCampania(campania: Campania){
    this.url = this.urlBase + 'AgregarNot';
    const body =  JSON.stringify(campania);
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        })
    };
    return this.http.post(this.url , body, httpOptions);
  }
  ObtenerUltimoRegistro(){
    this.url = this.urlBase + 'UltimoRegistroCamp';
    const body = {}
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        })
    };
    return this.http.post(this.url , body, httpOptions);
  }
  AClienteACampania(cve_camp,cve_clien){
    this.url = this.urlBase + 'AgregarClienteNot';


    const body = {
              Cve_campana: cve_camp,
              Cve_cliente: cve_clien
              }
              console.log(body);
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        })
    };
    return this.http.post(this.url , JSON.stringify(body), httpOptions);
  }
  CargaTablaClientes(Cve_camp){
    this.url = this.urlBase + 'ObtenerTblGpoCli';
    const body = {
              Cve_campana: Cve_camp
              }
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        })
    };
    return this.http.post(this.url , JSON.stringify(body), httpOptions);
  }
}
