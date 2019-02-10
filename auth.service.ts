import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(email : string , password : string){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  signup(FirstName : string, LastName : string , email : string , password : string){
    return new Promise((resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then((response)=>{
          let RandomNumber =Math.floor(Math.random()*1000)
          response.user.updateProfile({
            displayName : FirstName + " "+LastName,
            photoURL : "https://api.adorable.io/avatars/"+RandomNumber
          }).then(()=>{
            resolve(response.user);
          }).catch((error)=>{
            reject(error);
          })
        }).catch((error)=>{
          reject(error);
    })
  })
  }
}