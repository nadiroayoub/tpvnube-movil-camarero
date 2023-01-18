import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Mesa } from 'src/app/model/Mesa';
import { MesaService } from '../../services/apiMesa/mesa.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mesas: Mesa[] = [];
  enteredSearchValue: any;
  usuario;
  private updateUsuarioSubscription: Subscription;
  constructor(
    public router: Router,
    private navCtrl: NavController,
    private apiMesaService: MesaService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    // activatedRoute.params.subscribe((val) => {
    //   // put the code from `ngOnInit` here
    this.mesas = [];
    //   this.getMesas();
    // });
  }
  ionViewDidEnter() {
    console.log('home page');
    console.log('ngonint');
    this.mesas = [];
    this.authService.usuario.subscribe((res) => {
      this.usuario = res;
      this.getMesas();
    });
  }
  ngOnInit() {
    // console.log('ngonint');
    // this.authService.usuario.subscribe((res) => {
    //   this.usuario = res;
    //   this.getMesas();
    // });
  }
  changed() {
    console.log(this.enteredSearchValue);
  }
  getMesas(): any {
    // get mesas from user service
    //get all mesas filtring by user id
    this.apiMesaService.getList().subscribe((mesas) => {
      mesas.forEach((mesaAll) => {
        this.usuario.Negocio.Mesas.forEach((mesa) => {
          if (mesa.Id == mesaAll.Id) {
            this.mesas.push(mesaAll);
          }
        });
      });
    });
  }
  navigateWithData(mesaNumber: number) {
    this.navCtrl.navigateForward([
      this.mesas[mesaNumber].Estado !== 3 ? 'menu' : 'comandas',
      { mesa: JSON.stringify(this.mesas[mesaNumber]) },
    ]);
  }
}
