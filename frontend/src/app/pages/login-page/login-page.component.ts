import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup
  userLoginInfo: User
  user: User
  token: string

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('',[
        Validators.email, Validators.required, Validators.minLength(6)
      ]),
      password: new FormControl('',[
        Validators.required, Validators.minLength(3)
      ])
    })
  }
  // returns token
  loginUser() {
    this.userLoginInfo = this.form.value
    this.authService.login(this.userLoginInfo).subscribe( (data) => {

      //Storing jwt in frontend
      localStorage.setItem('token',data.token)
      
      this.form.reset()
      this.router.navigate(['users','user-profile', data.user._id ])
    })
  }
 
}
