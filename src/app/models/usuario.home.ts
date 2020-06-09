export class Catalogo {
    value: number;
    legend: string;
}

export class UsuarioModel {
    cveusuario: string;
    nombre: string;
    sucursal: string;
    existe: boolean;
}

export class CampaniasModel {
  cvecampania: string;
  nombrecampania: string;
  horacampania: string;
  fechacampania: string;
  quienlohizo: string;
  estatus: boolean;
}
export class ConfModel {
  cvecampania: string;
  cveconf: string;
  horacampania: string;
  fechacampania: string;
  enviado: boolean;
}