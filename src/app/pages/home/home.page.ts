import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { MesaService } from '../../services/apiMesa/mesa.service';

export enum Estado {
  disponible = 1,
  ocupado = 2,
  pendientePago = 3,
}
export interface Mesa {
  Id: string;
  Estado: Estado;
  Numero: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mesas: Mesa[] = [];
  enteredSearchValue: any;
  constructor(
    public router: Router,
    private navCtrl: NavController,
    private apiMesaService: MesaService
  ) {}

  ngOnInit() {
    this.getMesas();
    console.log(this.enteredSearchValue);
  }
  changed() {
    console.log(this.enteredSearchValue);
  }
  getMesas(): any {
    this.apiMesaService.getList().subscribe({
      next: (res) => {
        console.log(res);
        res.forEach((mesa) => {
          console.log(mesa);
          this.mesas.push(mesa);
        });
      },
      error: (err) => {
        alert('Error while fetching Mesas:/Mesa/ReadAll records!');
      },
    });
  }
  navigateWithData(mesaNumber: number) {
    const fullname = 'asa';
    this.navCtrl.navigateForward([
      this.mesas[mesaNumber].Estado !== 3 ? 'menu' : 'cuenta',
      { data: JSON.stringify(this.mesas[mesaNumber]) },
    ]);
  }
}
