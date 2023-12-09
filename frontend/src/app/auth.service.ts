import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Url:string = "http://localhost:3000/"
  constructor(private httpClient:HttpClient) { }
  createUser(user:any){
    return this.httpClient.post(this.Url+"new",user);
  }

  loginUser(data:any){
    return this.httpClient.post(this.Url+"login",data)
  }
}
