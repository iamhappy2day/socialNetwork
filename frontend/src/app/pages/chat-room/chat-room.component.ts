import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit {

  id: string
  friend: User

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private userService: UserService
  ) { 
    this.id = activateRoute.snapshot.params['id']
    // this.friend = this.userService.getUserById(this.id)
  }

  ngOnInit() {
    
  }

}
