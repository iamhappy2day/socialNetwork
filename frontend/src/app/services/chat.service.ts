import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  private socket: any = io('http://localhost:3000')
 
  joinChat(data) {
    this.socket.emit('join', data )
  }
}
