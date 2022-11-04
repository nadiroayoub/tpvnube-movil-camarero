import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.page.html',
  styleUrls: ['./cobrar.page.scss'],
})
export class CobrarPage implements OnInit {
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
}
