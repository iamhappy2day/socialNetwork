import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatService } from './services/chat.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ChatService]
})
export class AppComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    private route: ActivatedRoute,
    private router: Router
    ){}

  ngOnInit() {
    
  }
 
}
