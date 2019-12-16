import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { setDefaultService } from 'selenium-webdriver/edge';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  targetUser: User;
  form: FormGroup;
  id: string;

  constructor(
    private userService: UserService,
    private activateRoute: ActivatedRoute
    ) {
      this.id = activateRoute.snapshot.params['id']; //id param value of page url for getUser query
    }

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl('', [
         Validators.minLength(3)
       ]),
       nickname: new FormControl('',[
         Validators.minLength(3)
       ]),
       surname: new FormControl('',[
         Validators.minLength(2)
       ]),
       age: new FormControl('',[
        Validators.minLength(2)
      ]),
        sex: new FormControl('',[
          Validators.minLength(2)
        ]),
        country: new FormControl('',[
          Validators.minLength(2)
        ]),
        city: new FormControl('',[
          Validators.minLength(2)
        ])
    })
  }

  updateUser() {
    this.userService.updateUser(this.id, this.form.value, this.targetUser).subscribe();
  }

  deleteUser() {
    this.userService.deleteUser(this.id).subscribe()
  }


}
