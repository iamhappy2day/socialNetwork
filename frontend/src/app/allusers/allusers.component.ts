import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { SearchPipe } from '../pipes/search.pipe';
import { LoaderComponent } from '../loader/loader.component';


@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.scss']
})
export class AllusersComponent implements OnInit {
  searchStr = ''
  users: User[] = []

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
      this.userService.getAllUsers().subscribe( (usersArray) => {
        this.users = usersArray
      })
  }
 
}

