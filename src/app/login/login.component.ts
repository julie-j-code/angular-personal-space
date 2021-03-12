import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// ne pas oublier
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result:any;

  constructor(private afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){

    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      this.result = await this.afAuth.signInWithPopup(provider) ;

    } catch (error) {

    }

  }

}
