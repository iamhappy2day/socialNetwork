import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  targetUser: User 
  id: string
  message: string
  messages: string[] = []
  
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private chatService: ChatService
    ) {
       this.id = activateRoute.snapshot.params['id']; //id param value of page url for getUser query
   }

  ngOnInit() {
    this.userService.getUserId(this.id)
    this.authService.getmyUser(this.id).subscribe(
      data => this.targetUser = data,
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['/login'])
          }
        }
      })
      
      // this.chatService.getMessages()
      //   .subscribe((message:string) => {
      //     this.messages.push(message)
      //   })
  }

  updateUser() {
    this.router.navigate([`/users/user-profile/${this.id}/update`])
  }

  // sendMessage() {
  //   console.log(this.message)
  //   this.chatService.sendMessage(this.message);
  //   this.message = '';
  // }

}
