import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import { ChatService} from '../../services/chat.service';
import { Message, Chat, Conversacion } from '../../models/chat.models';
import { AnimateTimings } from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService, DatePipe]
})
export class ChatComponent implements OnInit {
  title = 'app';
  userId = 'A01';
  username: string = 'Asesor';
  listChat: Chat[] = [];
  maxChats = 4;
  destinatarios = [
                    ['12', 'VIRIDIANA MARGARITA', 'SIN ATENDER', 'ATENDER'],
                    ['13', 'MARTHA EULALIA', 'SIN ATENDER', 'ATENDER'],
                    ['A01', 'Usuario3', 'SIN ATENDER', 'ATENDER'],
                    ['4', 'Usuario4', 'SIN ATENDER', 'ATENDER'],
                    ['5', 'Usuario5', 'SIN ATENDER', 'ATENDER']
                  ];
  boxesHtml: string;

constructor(
    private cs: ChatService,
    private dp: DatePipe
  ){
      //this.InitializeSocketListerners();
    }

  setId(event: any) {
    this.userId = event;
    this.cs.AsignarID(this.userId);
    }

  ngOnInit() {
  
    }

  AgregarDest() {

    }
  EliminaDes() {

    }

  EnviarMensaje(mensaje: string, idDestino: string) {
  const inpMen =  document.getElementById(mensaje) as HTMLInputElement;
  const menString = inpMen.value;
  const date = new Date();
  const men = new Message( this.userId
                          , idDestino
                          , menString
                        );

  inpMen.value = '';
  const c  = this.listChat.find(cha => cha.idChat === idDestino);
  const conSend = new Conversacion(this.username, menString, this.userId);
  c.mensajes.push(conSend);

  this.cs.EnviarMensaje(this.userId.toString(), idDestino.toString(), menString);
  this.cs.Recibirmensajes().subscribe(
    r => {
      console.log('component',r);
      const conversacion = new Conversacion(c.nombreUsuario, r.content, idDestino);
      const currentC = this.listChat.find( ch => ch.idChat === idDestino );

      currentC.mensajes.push(conversacion);
    }
    , e => {
      console.log(e);
    }
  );


  }
  AbriChat(idChat: string, NombreUsuario: string, receiver: string, sender: string, button: any, eTbl: any ){
    
    if (this.maxChats > this.listChat.length) {
      const c = new Chat(idChat, NombreUsuario, receiver, sender, []);
      this.listChat.push(c);
      button.target.disabled = true;
      eTbl[2] = 'ATENDIENDO';
    } else {
      alert('No se puede tener más de' + this.maxChats + 'chats abiertos');
    }

  }
  CerrarChat(){

  }
  MinizarChat(){}


}
