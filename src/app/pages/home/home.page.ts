import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mesa } from 'src/app/model/Mesa';
import { MesaService } from '../../services/apiMesa/mesa.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mesas: Mesa[] = [];
  enteredSearchValue: any;
  usuario;
  constructor(
    public router: Router,
    private navCtrl: NavController,
    private apiMesaService: MesaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.usuario = this.authService.usuario;
      console.log(this.usuario);
      this.getMesas();
    }, 3000);
  }
  changed() {
    console.log(this.enteredSearchValue);
  }
  getMesas(): any {
    // get mesas from user service
    this.usuario.Negocio.Mesas.forEach((mesa) => {
      this.mesas.push(mesa);
    });
    // this.apiMesaService.getList().subscribe({
    //   next: (res) => {
    //     res.forEach((mesa) => {
    //       this.mesas.push(mesa);
    //     });
    //   },
    //   error: (err) => {
    //     alert('Error while fetching Mesas:/Mesa/ReadAll records!');
    //   },
    // });
  }
  navigateWithData(mesaNumber: number) {
    const fullname = 'asa';
    this.navCtrl.navigateForward([
      this.mesas[mesaNumber].Estado !== 3 ? 'menu' : 'cuenta',
      { data: JSON.stringify(this.mesas[mesaNumber]) },
    ]);
  }
}
