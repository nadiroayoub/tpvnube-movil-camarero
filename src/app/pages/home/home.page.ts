import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  mesas: { nombre: string; estado: string }[];

  constructor() {}

  ngOnInit() {
    this.mesas = [
      {
        nombre: 'mesa 1',
        estado: 'disponible',
      },
      {
        nombre: 'mesa 2',
        estado: 'finalizado',
      },
      {
        nombre: 'mesa 1',
        estado: 'noDisponible',
      },
    ];
  }
}
