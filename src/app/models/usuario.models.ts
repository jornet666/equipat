export class Usuario {
    constructor(
        public cve_usuario: number,
        public usuario: string,
        public password: string,
        public cve_perfil: number,
        public cve_menu: number,
        public num_empleado: number,
        public cve_seguridad: number,
        public cuentabloqueada: boolean,
        public activo: boolean,
        public cve_tipopassword: number,
        public periodocambiap: number,
        public cambiap: number,
        public veceslogin: number,
        public nombre: string,
        public cve_sucursal: number,
        public email: string,
        public telefono: number,
        public email_copias: string
    ){}
}

export class UsuarioNav{
    constructor(
        public cve_usuario: number,
        public cve_perfil: number,
        public nombre_perfil: string,
        public nombre_usuario: string,
        public token: string
    ){}
}
