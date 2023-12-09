import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private snackBar:MatSnackBar){

  }
  newForm!:FormGroup;
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
    this.newForm = this.formBuilder.group({
        fullName:['',Validators.required],
        username: ['', [Validators.required, Validators.email]],
        password1: ['', [Validators.required]],
        password2: ['', [Validators.required]]
    });
}


// convenience getter for easy access to form fields
get f() { return this.newForm.controls; }

submit(){
  this.submitted=true
  if(this.newForm.invalid){
    return;
  }else{
    if(this.newForm.get("password1")?.value == this.newForm.get("password1")?.value){
      let user = {
        fullName:this.newForm.get("fullName")?.value,
        username:this.newForm.get("username")?.value,
        password:this.newForm.get("password1")?.value
      }
      this.authService.createUser(user).subscribe(data=>{
        this.snackBar.open("Successfully registered.")
      },err=>{
        this.snackBar.open(err)
        console.log(err)
      })
      
    }
    console.log(this.newForm.value)
  }
}
}
