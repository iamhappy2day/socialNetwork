import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { ChatService } from './services/chat.service';
import { UserService } from './services/user.service';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  userId: string
  message: string

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private route: ActivatedRoute, 
    private userService: UserService,
    private router: Router,
    private cdRef:ChangeDetectorRef
    ){}

    ngAfterViewChecked() {
    this.userService._targetUser$.subscribe(userId => {
      this.userId = userId
      this.cdRef.detectChanges();
    })
  }
 
}

