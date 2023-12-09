import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"",
    component:AppComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"new",
    component:NewUserComponent
  },{
    path:"home",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
