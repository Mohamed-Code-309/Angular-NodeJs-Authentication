import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerURL = 'http://localhost:3000/api/register';
  private _loginURL = 'http://localhost:3000/api/login';


  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user){
    return this.http.post<any>(this._registerURL, user);
  }

  loginUser(user) : Observable<any>{
    return this.http.post(this._loginURL, user);
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logUserOut(){
    localStorage.removeItem('token')
    this.router.navigate(['/events'])
  }

}
