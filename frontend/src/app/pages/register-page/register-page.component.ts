import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  form: FormGroup
  formData: User 

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
       name: new FormControl('', [
        Validators.required, Validators.minLength(3)
       ]),
       nickname: new FormControl('',[
        Validators.required, Validators.minLength(3)
       ]),
       email: new FormControl('', [
         Validators.email, Validators.required
       ]),
       password: new FormControl('',[
         Validators.required, Validators.minLength(3)
       ])
    })
  }

  addUser() {
      this.formData = {...this.form.value}
      this.userService.addUser(this.formData).subscribe( () => {
        this.router.navigate(['/login'])
      })
  }
}
