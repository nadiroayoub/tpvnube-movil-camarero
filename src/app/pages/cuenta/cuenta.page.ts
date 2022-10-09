import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  currentNumber = 0;
  menuItems: { nombre: string; precio: string; imagen: string }[];

  constructor() {}

  ngOnInit() {
    this.menuItems = [
      {
        nombre: 'Tabla de embutidos',
        precio: '11.5€',
        imagen:
          'https://www.recetasderechupete.com/wp-content/uploads/2019/12/Entrantes-navide%C3%B1os.jpg',
      },
      {
        nombre: 'Ensalada mixta',
        precio: '12.5€',
        imagen:
          'https://www.recetasderechupete.com/wp-content/uploads/2019/12/Entrantes-navide%C3%B1os.jpg',
      },
      {
        nombre: 'Almejas a la sarten',
        precio: '10.5€',
        imagen:
          'https://www.recetasderechupete.com/wp-content/uploads/2019/12/Entrantes-navide%C3%B1os.jpg',
      },
    ];
  }
  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 0) {
      this.currentNumber--;
    }
  }
}
