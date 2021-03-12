import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-photos-album',
  templateUrl: './photos-album.component.html',
  styleUrls: ['./photos-album.component.css']
})
export class PhotosAlbumComponent implements OnInit {
  uploadForm:Form | undefined;
  photo = {title:'', }

  constructor() { }

  ngOnInit(): void {
  }

  postPhoto(){

  }

  onFileChange(e:any){
    return e.target.files[0];

  }

}
