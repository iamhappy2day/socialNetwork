import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket;

  constructor() { 
    this.socket = io('http://localhost:3000')
  }
   
 
  joinChat(data) {
    this.socket.emit('join', data.id );   
  }

  // sendMessage(message) {
  //   this.socket.emit('new-message', message)
  // }

  // getMessages = () => {
  //   return Observable.create((observer) => {
  //     this.socket.on('new-message', (message) => {
  //       observer.next(message)
  //     })
  //   })
  // }

}
 