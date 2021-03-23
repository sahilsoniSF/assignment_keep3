import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../login/user';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';



@Injectable({
  providedIn:'root'
})
export class AuthenticationService {

  constructor( private http:HttpClient ) {

  }

  authenticateUser(data:User) {
    return this.http.post('http://localhost:3000/auth/v1',data);
  }

  setBearerToken(token) {
    localStorage.setItem("token",token);
  }

  getBearerToken() {
    return localStorage.getItem("token");
  }

  isUserAuthenticated(token) {
    return this.http.post('http://localhost:3000/auth/v1/isAuthenticated',{},{
      headers:new HttpHeaders().set('Authorization',`Bearer ${token}`)
    })
  }
}
