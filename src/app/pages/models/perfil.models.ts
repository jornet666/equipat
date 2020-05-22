export class Perfil{
    constructor(
        public cve_perfil: number,
        public nombre: string,
        public puedevertodo: boolean,
        public activo: boolean,
        public cve_tipoestructura: number
    ){}
}