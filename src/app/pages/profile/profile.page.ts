import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from '../../services/auth/auth.service';
import { EmpleadoService } from '../../services/apiEmpleado/empleado.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare let cordova: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  formEmpleado: FormGroup;

  base64Image;
  usuario;
  selectedFile: File = null;
  profileImgUrl: any = '';
  profileImgUrlSendedToServer: File = null;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera,
    private authService: AuthService,
    private empleadoService: EmpleadoService,
    private router: Router,
    private toastController: ToastController,
    public sanitizer: DomSanitizer
  ) {
    this.formEmpleado = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      foto: [''],
      telefono: [''],
    });
  }
  async ngOnInit() {
    const usuario = await this.getUsuario();
  }

  updateEmpleado() {
    const data = this.formEmpleado.value;
    this.empleadoService
      .updateWithoutPassword('idEmpleado', this.usuario.Id, data)
      .subscribe({
        next: (res) => {
          this.empleadoService
            .UpladImage(this.usuario.Id, this.profileImgUrlSendedToServer)
            .subscribe({
              next: (res) => {
                this.presentToast(
                  '¡Empleado editado!',
                  'bottom',
                  'success',
                  'checkmark'
                ).then((toast) => {
                  toast.present();
                });
                return res;
              },
              error: () => {
                this.presentToast(
                  '¡Empleado no editado!',
                  'bottom',
                  'danger',
                  'close'
                ).then((toast) => {
                  toast.present();
                });
              },
            });
        },
        error: () => {
          this.presentToast(
            '¡Empleado no editado!',
            'bottom',
            'danger',
            'close'
          ).then((toast) => {
            toast.present();
          });
        },
      });
  }

  // Get usuario
  async getUsuario() {
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        this.authService.usuario.subscribe((res) => {
          this.usuario = res;
          resolve(this.usuario);
          this.initializeForm();
        });
      });
    }, 1000);
  }
  // initialize a form
  initializeForm() {
    this.formEmpleado = this.formBuilder.group({
      nombre: [this.usuario.Nombre, Validators.required],
      apellidos: [this.usuario.Apellidos, Validators.required],
      dni: [
        this.usuario.Dni,
        [Validators.required, Validators.pattern(this.nifNieRegex)],
      ],
      email: [
        this.usuario.Email,
        [Validators.required, Validators.pattern(this.emailRegex)],
      ],
      foto: [this.usuario.Foto],
      telefono: [this.usuario.Telefono],
    });
    this.createProfileImage();
  }
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

  // show image when we upload it
  // profile image
  onSelectFile(e: any): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.profileImgUrlSendedToServer = e.target.files[0];
      console.log(this.profileImgUrlSendedToServer);
      reader.onload = (event: any) => {
        this.formEmpleado.controls['foto'].setValue(' ');
        this.profileImgUrl = event.target.result;
      };
    }
  }
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }

  //#region upload image
  createProfileImage() {
    var filename = this.usuario.Foto.split('/').pop();
    if (this.usuario.Foto != '') {
      this.profileImgUrl = 'assets/images/EmpleadoImages/' + filename;
    } else {
      this.profileImgUrl = '';
    }
  }
  loadingImage(imageType: string) {
    const byteString = window.atob(
      this.authService.imageByte != null
        ? this.authService.imageByte.toString()
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
  //#endregion
  // toast message
  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    estado: 'success' | 'danger',
    icon: 'checkmark' | 'close'
  ) {
    const toast = await this.toastController.create({
      message: `<ion-icon name="${icon}-circle-outline"></ion-icon> ${message}`,
      duration: 1500,
      position: position,
      color: estado,
    });
    return toast;
  }
}
