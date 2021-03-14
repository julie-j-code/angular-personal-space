# NgPersonalSpace

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Angular Material

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

# Additional Installations 

npm install firebase
ng add @angular/fire (après avoir crée le projet sur firebase !)

## Further information 

les variables d'environnement  ont été ajoutées directement dans export const environment du fichier environnement.ts crée à l'initiation du projet

d'où la succession des imports pour firebase
// firebase

``
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment";
``

et l'import dans le tableau des imports de app-module.ts
`AngularFireModule.initializeApp(environment),`

pour rendre accessible AngularFireStorage 
dans app-module :
import { AngularFireStorageModule } from '@angular/fire/storage';
dans photos-album-component
import { AngularFireStorage } from '@angular/fire/storage';

## Memo
pour générer l'interface :
ng g interface models/personal-space
pour notamment mettre à jour (si l'upload s'est effectuée avec succès) le tableau des urls qui figure dans notre collection
ng g service services/db

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
