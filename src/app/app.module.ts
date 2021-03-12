import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarsComponent } from './components/cars/cars.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { PublicComponent } from './components/public/public.component'
import {TokenInterceptorService} from './services/token-interceptor.service'
import {AuthGuard} from './auth.guard'
@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    SigninComponent,
    SignupComponent,
    PublicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
