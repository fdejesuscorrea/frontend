import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BackendURI} from '../../config'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient,private router : Router) { }
  signup(user:any){
    return this.http.post(BackendURI+'/signup',user);
  }
  signin(user:any){
    return this.http.post<any>(BackendURI+'/signin',user);

  }
  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }

  }
  getToken(){
    return localStorage.getItem('token');
  }
  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}

