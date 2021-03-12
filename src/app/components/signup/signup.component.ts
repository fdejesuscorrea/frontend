import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user={
    email:'',
    password:""
  }
  constructor(private authService:AuthService, private router :Router ) { }

  ngOnInit(): void {
  }
  signUp(){
    this.authService.signup(this.user).subscribe(
      (res:any) =>{
        localStorage.setItem('token',res.token);
        console.log(res.token);
        this.router.navigate(['/cars']);
      },
      (err:any) =>{
        if(err.status==401){
          this.unAuth();
        }
      }
    );
  }
  unAuth(){
    const element =document.getElementById("message");
    if(element){
      element.style.display="";
      element.innerHTML="el email ingresado ya esta registrado o no puede registrarse";
    }
 }
}
