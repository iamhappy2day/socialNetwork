import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newUser: User
  targetUser: User 

  private _targetUser = new Subject<User>()
  _targetUser$ = this._targetUser.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  //Register new user
    addUser(formData):Observable<User> {
      this.newUser = {...formData}
      return this.http.post<User>('http://localhost:3000/register', this.newUser) // return stream
    }

    getUser(user: User) {
      this._targetUser.next(user)
    }

    //Update user
    updateUser(id, formData): Observable<User> {
      return this.http.put<User>(`http://localhost:3000/users/${id}`, formData)
    }

    //Delete user
    deleteUser(id): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/users/${id}`)
    }

    //Get all users
    getAllUsers():Observable <User[]> {
      return this.http.get<User[]>('http://localhost:3000/users/')
    }
}
