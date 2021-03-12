import { Injectable } from '@angular/core';
import {AuthService} from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {
  intercept(req:any,next:any){
    const tokenizeRequest=req.clone({
      setHeaders:{
        Authorization:`Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeRequest);
  }
  constructor(private authService:AuthService) { }
}
