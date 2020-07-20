import { Injectable } from '@angular/core';
// import { Socket } from 'ngx-socket-io';
import { Message } from '../models/chat.models';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as io from 'socket.io-client';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService   {

 // private url = 'https://real-chat-enc.herokuapp.com/socket.io';
  private socket;
  private userId: string;

  constructor( ) {
    this.socket = io('https://real-chat-enc.herokuapp.com',{});
  }
// EnviarMensaje(mensaje: Mensaje) {
  EnviarMensaje(sc: string, rc: string, cont: string) {
const m = new Message(rc, sc, cont);
 
  console.log(m);
  this.socket.emit('send_message', m);
}
Recibirmensajes(){
  return Observable.create((observer) => {
    this.socket.on('receive_message', (data: any) => {
      console.log('service', data);
      observer.next(data);
      });
  });
}

AsignarID(id: string) {
  this.socket = io(
    'https://real-chat-enc.herokuapp.com'
    , {
      query:  {chatID: id}
    }).connect();
}
}
