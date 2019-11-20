import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;



  constructor(private http: HttpClient) { }

  // login user
  login(userInfo: User): Observable<any> {
      return this.http.post('http://localhost:3000/login', userInfo)
  }

  getmyUser(id): Observable<any> {
    return this.http.get(`http://localhost:3000/users/user-profile/${id}`)
  }

  // logout user
  logout() {   
    localStorage.removeItem('token')
  }

  //check if user autorized or not
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') 
  }

  // get token from localStorage
  getToken(): string {
    return localStorage.getItem('token')
  }

}
