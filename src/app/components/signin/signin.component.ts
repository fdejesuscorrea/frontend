import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { Component, OnInit } from '@angular/core';
import {BackendURI} from '../../../config'
import {AuthService} from '../../services/auth.service'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  user={
    email:"",
    password:""
  }
  constructor(private router:Router,private http:HttpClient, private authService:AuthService) { }

  ngOnInit(): void {
  }
  signIn(){
    this.authService.signin(this.user).subscribe(
      res =>{
          localStorage.setItem('token', res.token);
          this.router.navigate(['/cars']);   
      },
      err=>{
        this.unAuth(err);
        
      }
    );
  } 
  unAuth(err:any){
     const element =document.getElementById("message");
     if(element){
       element.style.display="";
       element.innerHTML="revise su informacion de inicio de sesion";
     }
  }
}
