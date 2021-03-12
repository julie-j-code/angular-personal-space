import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosAlbumComponent } from './photos-album.component';

describe('PhotosAlbumComponent', () => {
  let component: PhotosAlbumComponent;
  let fixture: ComponentFixture<PhotosAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotosAlbumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
