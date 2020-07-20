export class Message {
    constructor(
                public receiverChatID: string,
                public senderChatID: string,
                public content: string
                //public fechaHora: string
                ) {}
}




export class Chat {
    constructor(
            public idChat: string,
            public nombreUsuario: string,
            public receiverChatID: string,
            public senderChatID: string,
            public mensajes?: Conversacion[]
    ) {}
}

export class Conversacion {
    constructor(
        public nombreUs: string,
        public mensaje: string,
        public idUser: string
    ){}
}