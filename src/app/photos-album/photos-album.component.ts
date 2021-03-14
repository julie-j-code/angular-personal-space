import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormGroup, NgForm } from '@angular/forms';
// ne pas oublier
import firebase from 'firebase/app';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

// pour récupérer l'utilisateur
import { AngularFireAuth } from "@angular/fire/auth";
// pour intéragir avec Firebase Storage qu'il faut rajouter également dans app.module
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireStorage } from '@angular/fire/storage';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-photos-album',
  templateUrl: './photos-album.component.html',
  styleUrls: ['./photos-album.component.css']
})

export class PhotosAlbumComponent implements OnInit {
  // uploadForm: Form | any;
  // photo = { title: '', file: '' };
  // user: firebase.User | any;
  // userSub: Subscription | any;
  // photoServerURL$: any;
  // uploadedImgURL: any;
  // personalSpace: any;

  user:any;
  photo = { file: '', title: '' };
  photoServerURL : any;
  uploadedImgURL = '';
  personalSpace:any;



//   // injection des dépendances
//   // si l'upload s'est effectuée avec succès, pour mettre à jour db, il nous faut une instance de DbService
//   // et le personal-space de l'utilisateur sera récupéré via le personal-space uid
//   constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage, private db: DbService) { }

//   ngOnInit(): void {

//     this.userSub = this.afAuth.authState.subscribe(user => {
//       // on récupère la valeur courante : soit un user, soit null
//       this.user = user;
//       // et si il existe, son personal-space
//       if (this.user) {
//         this.db.readPersonalSpaceByUID(this.user.uid).subscribe(
//           (data) => {
//             console.log('personal space', data);
//             this.personalSpace = data;
//             // S'il n'existe pas, on en crée un
//             if (!data || data.length === 0) {
//               console.log(`creating a new space for ${this.user.displayName}`);
//               this.db.createPersonalSpace(this.user);
//             }
//           },
//           (err) => {
//             console.error(err);
//           }
//         );
//       }

//     });

//   }

//   postPhoto() {

//     // https://github.com/angular/angularfire/blob/master/docs/storage/storage.md

//     // 1- retrieve user id
//     const uid = this.user.uid;

//     // 2 - create a path and retrieve a reference from where we're pointing to
//     const photoPathOnServer = `personal-space/${uid}/${this.photo.title}`;
//     const photoRef = this.afStorage.ref(photoPathOnServer);

//     // 3 - upload!
//     const currentUpload = this.afStorage.upload(photoPathOnServer, this.photo.file);
//     currentUpload.catch((err: any) => console.error(err));

//     // Listening to retrieve the photo URL
//     //!\ do NOT try to retrieve the URL too soon => use finalize operator to wait for the Observable to be completed
//     currentUpload
//       .snapshotChanges()
//       .pipe(
//         tap((val) => console.log('before finalize()', val)),
//         finalize(() => {
//           this.photoServerURL$ = photoRef.getDownloadURL();
//           console.log('photoServerURL', this.photoServerURL$);

//           this.photoServerURL$.subscribe((data: any) => {
//             console.log('data ', data);
//             this.uploadedImgURL = data;
//             // on met à jour le tableau des url du personal-space de notre utilisateur
//             this.db.updatePersonalSpacePhotoURLs(this.user, this.uploadedImgURL);
//           });
//         })
//       )
//       .subscribe();

//       // clear form
//       this.photo = { file: '', title: '' };

//   }



//   onFileChange(e: any) {
//     return e.target.files[0];
//     this.photo.file = e.target.files[0];

//   }

//   // au moment de la destruction du component, on fait du nettoyage !
//   ngOnDestroy() {
//     this.userSub.unsubscribe();

//   }

// }


constructor(
  private afAuth: AngularFireAuth,
  private afStorage: AngularFireStorage,
  private db: DbService
) {}

ngOnInit() {
  this.afAuth.authState.subscribe((user) => {
    console.log('user', user);

    this.user = user;
    if (this.user) {
      // console.log(this.db.readPersonalSpaceByUID(user.uid));

      this.db.readPersonalSpaceByUID(user!.uid).subscribe(
        (data) => {
          console.log('ngOnInt readPersonnalSpaceById / data', data);
          this.personalSpace = data;
          if (!data || data.length === 0) {
            console.log(`Creating a new space for ${user!.displayName}`);
            this.db.createPersonalSpace(this.user);
          }
        },
        (err) => {
          console.error('readPersonalSpaceById error', err);
        }
      );
    }
  });
}

onFileChange(e:any) {
  console.log(e.target.files[0]);
  this.photo.file = e.target.files[0];
}

postPhoto() {
  console.log(this.photo);
  const uid = this.user.uid;
  const photoPathOnServer = `personal-space/${uid}/${this.photo.title}`;
  const photoRef = this.afStorage.ref(photoPathOnServer);
  this.photoServerURL = '';

  console.log('photoPathOnServer', photoPathOnServer);
  console.log('uid', uid);
  console.log('this.photo.file', this.photo.file);
  console.log('this.photo.title', this.photo.title);

  const currentUpload = this.afStorage.upload(
    photoPathOnServer,
    this.photo.file
  );

  currentUpload.catch((err) => console.error(err));

  currentUpload
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.photoServerURL = photoRef.getDownloadURL();
        this.photoServerURL.subscribe((data:any) => {
          console.log('data >>> ', data);
          this.uploadedImgURL = data;
          this.db.updatePersonalSpacePhotoURLs(
            this.user,
            this.uploadedImgURL
          );
        });
      })
    )
    .subscribe();

  // clear form
  this.photo = { file: '', title: '' };
}
}
