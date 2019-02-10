import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  myForm : FormGroup;
  message : string="";
  userError : any;

  constructor(public fb : FormBuilder,public authService : AuthService) {
    this.myForm = this.fb.group({
      FirstName : ['',[Validators.required]],
      LastName : ['',[Validators.required]],
      email : ['',[Validators.required]],
      password : ['',[Validators.required,Validators.minLength(8)]],
      confirmpassword : ['',[Validators.required]]
    },{
      validators : this.checkpasswd("password","confirmpassword")
    }
    );
   }
   checkpasswd(passwordKey : string,confirmpasswordKey : string){
      return (group :FormGroup) =>{
        let password =group.controls[passwordKey];
        let confirmpassword =group.controls[confirmpasswordKey];

        if(password.value==confirmpassword.value)
          return;
        else{
          confirmpassword.setErrors({notEqualToPassword : true})
        }
      }
   }
   onSubmit(signupform){
    let email : string = signupform.value.email;
    let password : string = signupform.value.password;
    let FirstName : string = signupform.value.FirstName;
    let LastName : string = signupform.value.LastName;

    this.authService.signup(FirstName,LastName,email,password)
    .then((user : any) => {

      firebase.firestore().collection("users").doc(user.uid).set({
        FirstName : signupform.value.FirstName,
        LastName : signupform.value.LastName,
        email : signupform.value.email,
        photoURL : user.photoURL,
        interests : "",
        bio : "",
        hobbies : "",
      }).then(()=>{
        this.message = "You have been Signed Up Suceesfully. Now Login...";
      })

      }).catch((error) => {
      console.log(error);
      this.userError=error;
    });

   }

  ngOnInit() {
  }

}
