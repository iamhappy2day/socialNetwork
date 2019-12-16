import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  newUser: User;
  userId: string;

  private _targetUser = new Subject<string>();
  _targetUser$ = this._targetUser.asObservable();

  constructor(private router: Router, private http: HttpClient) { }

  // Register new user
    addUser(formData): Observable<User> {
      this.newUser = {...formData};
      return this.http.post<User>('http://localhost:3000/register', this.newUser); // return stream
    }

    getUserId(userId: string) {
      this._targetUser.next(userId);
    }

    // Update user
    updateUser(id, formData, userInfo): Observable<User> {
      const data = {...userInfo, ...formData}
      return this.http.put<User>(`http://localhost:3000/users/${id}`, data);
    }

    // Delete user
    deleteUser(id): Observable<void> {
      return this.http.delete<void>(`http://localhost:3000/users/${id}`);
    }

    // Get all users
    getAllUsers(): Observable <User[]> {
      return this.http.get<User[]>('http://localhost:3000/users/');
    }

     // Get user by Id
    getUserById(id): Observable<User> {
      return this.http.get<User>(`http://localhost:3000/users/${id}`);
    }
}
