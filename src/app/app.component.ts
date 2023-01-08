import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { EventsService } from './services/events/events.service';
import { AuthService } from './services/auth/auth.service';
import { Usuario } from './interfaces/interfaces';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  usuario;
  profileImgUrl: any;
  imageByte: any;
  imageUploaded = '';
  constructor(
    private menu: MenuController,
    private _router: Router,
    public events: EventsService,
    private _authService: AuthService,
    public sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.events.receiveLogin().subscribe((res: any) => {
      if (res == 'Ok') {
        setTimeout(() => {
          this._authService.usuario.subscribe((res) => {
            this.usuario = res;
          });
          this.createProfileImage();
        }, 2000);
      }
    });
    console.log(this.usuario);
  }

  goTo(route: string) {
    this._router.navigate(['/' + route]);
    this.menu.close();
  }
  openEnd() {
    this.menu.close();
  }
  // profile image
  onSelectFile(e: any, usuario: Usuario): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageUploaded = e.target.files[0];
      reader.onload = (event: any) => {
        this.profileImgUrl.url = event.target.result;
      };
    }
  }
  createProfileImage() {
    this.imageByte = this._authService.imageByte;
    const imageBlob = this.loadingImage(
      this._authService.imageByte != null
        ? this._authService.imageByte.toString()
        : ''
    );
    var fileName = this.usuario.Foto.split('/').pop()!;
    const imageFile = new File(
      [imageBlob],
      fileName.substring(0, fileName.lastIndexOf('.'))
    );
    const finalFileHandle = {
      file: imageFile,
      url: this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(imageFile)
      ),
    };
    this.profileImgUrl = finalFileHandle;
  }
  loadingImage(imageType: string) {
    const byteString = window.atob(
      this._authService.imageByte != null
        ? this._authService.imageByte.toString()
        : ''
    );
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
