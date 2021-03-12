import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './components/cars/cars.component'
import { PublicComponent } from './components/public/public.component'
import {SigninComponent} from './components/signin/signin.component'
import {SignupComponent} from './components/signup/signup.component'
import {AuthGuard} from './auth.guard'
const routes: Routes = [
  {
    path:'',
    redirectTo:'/public',
    pathMatch: 'full'
  },
  {
    path:'cars',
    component:CarsComponent,
    canActivate:[AuthGuard]
  },
  
  {
    path:'public',
    component:PublicComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'signup',
    component:SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
