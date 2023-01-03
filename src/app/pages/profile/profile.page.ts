import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { EmpleadoService } from '../../services/apiEmpleado/empleado.service';
import { Usuario } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  profileImgUrl: any;
  imageUploaded: File = null;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private camera: Camera,
    private authService: AuthService,
    private http: HttpClient,
    private empleadoService: EmpleadoService,
    private router: Router
  ) {}
  updateEmpleado() {
    // const filedata = new FormData();
    // filedata.append('image', this.imageUploaded, this.imageUploaded.name);
    // this.formEmpleado.get('foto').setValue(this.imageUploaded.name);
    console.log(this.formEmpleado.value);
    console.log(this.usuario.Id);
    console.log(this.imageUploaded);
    // console.log(this.formEmpleado.get('pass')?.value);
    // this.usuario.Id, this.imageUploaded, this.duenyoForm.get('pass')?.value;
    // this.formEmpleado.controls['foto'].setValue(this.selectedFile.name);
    const data = this.formEmpleado.value;
    this.empleadoService
      .updateWithoutPassword('idEmpleado', this.usuario.Id, data)
      .subscribe({
        next: (res) => {
          this.empleadoService
            .UpladImage(this.usuario.Id, this.imageUploaded, this.usuario.Pass)
            .subscribe((res) => {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Empleado editado!',
                showConfirmButton: false,
                timer: 3500,
              });
              return res;
            });
          this.logout();
          this.formEmpleado.reset();
        },
        error: () => {
          alert('Error al momento de editar un Dueño');
        },
      });
  }

  ngOnInit() {
    this.usuario = this.authService.usuario;
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

    console.log(this.imageUploaded);
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
  guardar() {
    const filedata = new FormData();
    filedata.append('image', this.imageUploaded, this.imageUploaded.name);
    this.formEmpleado.get('foto').setValue(this.imageUploaded.name);
    console.log(this.imageUploaded.name);
    console.log(this.formEmpleado);

    // this.formEmpleado.controls['foto'].setValue(this.selectedFile.name);
    // this.empleadoService.update('idEmpleado', this.usuario.Id, ).subscribe({
    //   next: (res) => {
    //     console.log('Empleado modificado');
    //     this.empleadoForm.reset();
    //     this.dialogRef.close('Editar');
    //   },
    //   error: () => {
    //     alert('Error al momento de editar un nuevo Empleado');
    //   },
    // });
  }
  // show image when we upload it
  // profile image
  onSelectFile(e: any): any {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.imageUploaded = e.target.files[0];
      reader.onload = (event: any) => {
        this.formEmpleado.controls['foto'].setValue(' ');
        this.imageUploaded = event.target.result;
      };
    }
  }
  logout() {
    this.router.navigateByUrl('/auth');
    this.authService.logout();
  }
}
