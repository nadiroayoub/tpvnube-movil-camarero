import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public todo: FormGroup;
  base64Image;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private camera: Camera
  ) {
    this.todo = this.formBuilder.group({
      nombreApellidos: [''],
      // Validators.required
      nombreUsuario: [''],
      correo: [''],
      telefono: [''],
    });
  }
  logForm() {
    console.log(this.todo.value);
  }

  ngOnInit() {}

  openGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(this.base64Image);
      },
      (err) => {}
    );
  }
}
