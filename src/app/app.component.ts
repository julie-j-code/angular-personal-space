import { Component } from '@angular/core';
// import de Router pour implémenter le routage
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
pageName:any;

// création d'une instance de Router
constructor(private router:Router){

}

// navigateTo attend le nom du dernier segment de route
navigateTo(pageName:any){
    this.router.navigate([`/${pageName}`]);

  }
}
