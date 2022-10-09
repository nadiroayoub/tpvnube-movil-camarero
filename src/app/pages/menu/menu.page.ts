import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categoriesMenu: { nombre: string; imagen: string }[];
  menuItems: { nombre: string; precio: string; imagen: string }[];
  currentNumber = 0;

  constructor() {}

  ngOnInit() {
    this.categoriesMenu = [
      {
        nombre: 'Entrantes',
        imagen:
          'https://www.recetasderechupete.com/wp-content/uploads/2019/12/Entrantes-navide%C3%B1os.jpg',
      },
      {
        nombre: 'Carne',
        imagen:
          'https://ichef.bbci.co.uk/news/640/cpsprodpb/3A14/production/_106486841_gettyimages-535786572.jpg',
      },
      {
        nombre: 'Pescado',
        imagen: 'https://assets.unileversolutions.com/recipes-v2/213136.jpg',
      },
    ];
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
