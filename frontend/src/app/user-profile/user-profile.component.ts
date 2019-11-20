import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  showForm: boolean = false;
  targetUser: User 
  id: string

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router
    ) {
       this.id = activateRoute.snapshot.params['id']; //id param value of page url for getUser query
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

  updateUser() {
    this.router.navigate([`/users/user-profile/${this.id}/update`])
  }


}
