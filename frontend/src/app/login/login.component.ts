import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private dialog:MatDialog,private formBuilder:FormBuilder,private authService:AuthService,private snackBar:MatSnackBar,private router:Router) { }

  loginForm!:FormGroup<authModel>;
  submitted:boolean = false;
  
  // getEmailDialog(){
  //   this.dialog.open(ForgetDialogComponent,{
  //   width:'350px'
  //   })
  // }

  ngOnInit() {

    // if(this.authService.isLoggedIn()){
    //     this.router.navigate(["/home/dashboard"])
    // }
    // this.authService.getServerStatus();
    this.loginForm = this.formBuilder.group({
        
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });
}

// convenience getter for easy access to form fields
get f() { return this.loginForm.controls; }

login() {
    this.submitted = true;
    console.log(this.loginForm)
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }else{
    

        this.authService.loginUser(this.loginForm.value).subscribe(data=>{
          console.log(data)
            this.snackBar.open("Successfully loggedin.",'',{
             duration:5000
            })
            
            this.router.navigate(["/home"]).catch(reason=>{
             console.log(reason)
            })
        },err=>{
          this.snackBar.open(err.error.text,'',{
            duration:5000
           })
        })}
}
}
class authModel{
  username!:any;
  password!:any
}

