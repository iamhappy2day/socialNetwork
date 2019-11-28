import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-random-user-profile',
  templateUrl: './random-user-profile.component.html',
  styleUrls: ['./random-user-profile.component.scss']
})
export class RandomUserProfileComponent implements OnInit {
  
  id: string
  targetUser: User

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private chatService: ChatService,
    private router: Router
  ) { 
    this.id = activateRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.authService.getmyUser(this.id).subscribe(
      data => this.targetUser = data,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      })
  }

  joinChat() {
    this.chatService.joinChat({id: this.id, user: this.targetUser})
  }
  goToDialog() {
    this.router.navigate(['users', 'user-profile', `${this.id}`,'messages'])
  }

}
