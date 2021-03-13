import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
// ne pas oublier
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

// pour récupérer l'utilisateur
import { AngularFireAuth } from "@angular/fire/auth";
// pour intéragir avec Firebase Storage qu'il faut rajouter également dans app.module
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-photos-album',
  templateUrl: './photos-album.component.html',
  styleUrls: ['./photos-album.component.css']
})

export class PhotosAlbumComponent implements OnInit, OnDestroy {
  uploadForm:Form | undefined;
  photo = {title:'',file:'' };
  user:firebase.User | any;
  userSub: Subscription | any;
  photoServerURL$:any;
  uploadedImgURL:any;
  personalSpace:any;



  // injection des dépendances
  constructor(private afAuth:AngularFireAuth, private afStorage:AngularFireStorage) { }

  ngOnInit(): void {
    this.userSub = this.afAuth.authState.subscribe(user => {
      // on récupère la valeur courante : soit un user, soit null
      this.user = user;
    });

  }

  postPhoto(){

  // https://github.com/angular/angularfire/blob/master/docs/storage/storage.md

    // 1- retrieve user id
    const uid = this.user.uid;

    // 2 - create a path and retrieve a reference from where we're pointing to
    const photoPathOnServer = `personal-space/${uid}/${this.photo.title}`;
    const photoRef = this.afStorage.ref(photoPathOnServer);

    // 3 - upload!
    const currentUpload = this.afStorage.upload(photoPathOnServer,this.photo.file);
    currentUpload.catch((err:any) => console.error(err));

    // Listening to retrieve the photo URL
    //!\ do NOT try to retrieve the URL too soon => use finalize operator to wait for the Observable to be completed
    currentUpload
      .snapshotChanges()
      .pipe(
        tap((val) => console.log('before finalize()', val)),
        finalize(() => {
          this.photoServerURL$ = photoRef.getDownloadURL();
          console.log('photoServerURL', this.photoServerURL$);

          this.photoServerURL$.subscribe((data:any) => {
            console.log('data ', data);
            this.uploadedImgURL = data;
          });
        })
      )

  }



  onFileChange(e:any){
    return e.target.files[0];
    this.photo.file = e.target.files[0];

  }

  // au moment de la destruction du component, on fait du nettoyage !
  ngOnDestroy(){
    this.userSub.unsubscribe();

  }

}
