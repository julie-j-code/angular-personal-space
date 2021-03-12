import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

// ne pas oublier
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  result: any;
  user: firebase.User | any;

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    // il faut connaitre l'état d'authentification ou non de l'utilisateur
    // au moment de l'initialisation du component
    // pour pouvoir éventuellement le déconnecter
    // grâce à l'instance d'AngularFireAuth
    // qui nous retourne un observable
    // auquel il nous suffit de nous abonner !
    this.afAuth.authState.subscribe(user => {
      // on récupère la valeur courante : soit un user, soit null
      this.user = user;
    });

  }

  async loginWithGoogle() {

    try {
      var provider = new firebase.auth.GoogleAuthProvider();
      this.result = await this.afAuth.signInWithPopup(provider);

    } catch (error) {

    }

  }

  async signOut() {
    await this.afAuth.signOut();
  }

}
