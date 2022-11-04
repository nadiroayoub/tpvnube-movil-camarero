import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  currentNumber = 0;
  menuItems: { nombre: string; precio: string; imagen: string }[];
  public cuentaDescargada = false;
  constructor(private router: Router) {}

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
  openCuenta() {
    this.cuentaDescargada = true;
  }
  openFactura() {
    if (this.cuentaDescargada === true) {
      this.router.navigate(['/factura']);
      const btn = document.querySelector(
        'imprimirCuenta'
      ) as HTMLButtonElement | null;
      if (btn != null) {
        btn.disabled = true;
        btn.classList.remove('active');
      }
    }
  }
}
