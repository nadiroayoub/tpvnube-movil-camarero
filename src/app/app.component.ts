import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: {
    nombre: string;
    rol: string;
    imagen: string;
  };
  constructor(private menu: MenuController) {
    this.user = {
      nombre: 'Ayoub',
      rol: 'Cocinero',
      imagen: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    };
  }

  clickable() {
    console.log('clicked');
  }
  openEnd() {
    this.menu.close();
  }
}
