import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categoriesMenu: { nombre: string; imagen: string; active: boolean }[];
  menuItems: { nombre: string; precio: string; imagen: string }[];
  public active: number[] = [];
  currentNumber = 0;
  dataComing;
  constructor(public activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.dataComing = this.activatedRoute.snapshot.params.data;
    this.dataComing = JSON.parse(this.dataComing);
    console.log(this.dataComing.Estado);
    this.categoriesMenu = [
      {
        nombre: 'Entrantes',
        imagen:
          'https://www.recetasderechupete.com/wp-content/uploads/2019/12/Entrantes-navide%C3%B1os.jpg',
        active: true,
      },
      {
        nombre: 'Carne',
        imagen:
          'https://ichef.bbci.co.uk/news/640/cpsprodpb/3A14/production/_106486841_gettyimages-535786572.jpg',
        active: false,
      },
      {
        nombre: 'Pescado',
        imagen: 'https://assets.unileversolutions.com/recipes-v2/213136.jpg',
        active: false,
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
  activeCatogory(index: number) {
    console.log(index);
    for (const [i, value] of this.categoriesMenu.entries()) {
      if (i === index) {
        value.active = true;
      } else {
        value.active = false;
      }
    }
  }
}
