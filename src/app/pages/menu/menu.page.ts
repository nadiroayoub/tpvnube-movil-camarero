import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from 'src/app/model/Menu';
import { ApiAuthService } from 'src/app/services/apiAuth/auth.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiMenuService } from '../../services/apiMenu/api-menu.service';
import { ApiPlatoService } from '../../services/apiPlato/api-plato.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categoriesMenu: { nombre: string; imagen: string; active: boolean }[];
  menuItems: { nombre: string; precio: number; imagen: string }[] = [];
  platoItems: { nombre: string; precio: number; imagen: string }[] = [];
  public active: number[] = [];
  currentNumber = 0;
  dataComing;
  menuActivated = true;
  usuario;
  constructor(
    public activatedRoute: ActivatedRoute,
    private apiMenuService: ApiMenuService,
    private apiPlatoService: ApiPlatoService,
    private apiAuthService: AuthService
  ) {}

  ngOnInit() {
    this.apiAuthService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.dataComing = this.activatedRoute.snapshot.params.data;
    this.dataComing = JSON.parse(this.dataComing);
    console.log(this.dataComing.Estado);
    this.categoriesMenu = [
      {
        nombre: 'Menus',
        imagen: '../../../assets/icon/menu icon.png',
        active: true,
      },
      {
        nombre: 'Platos',
        imagen: '../../../assets/icon/dish icon.png',
        active: false,
      },
    ];
    this.getMenus();
    this.getPlatos();
  }
  //#region Menu API
  getMenus() {
    console.log('get menus');
    this.apiMenuService.getList().subscribe((menus: Menu[]) => {
      menus.forEach((menu) => {
        if (menu.NegocioMenu.Id == this.usuario.Negocio.Id){
          var menuItem = {
            nombre: menu.Nombre,
            precio: menu.Precio,
            imagen: menu.Foto,
          };
          this.menuItems.push(menuItem);
        }
      });
    });
  }
  //#endregion
  //#region Plato API
  getPlatos() {
    this.apiPlatoService.getList().subscribe((platos) => {
      platos.forEach((plato) => {
        if (plato.NegocioPlato.Id == this.usuario.Negocio.Id){
          var platoItem = {
            nombre: plato.Nombre,
            precio: plato.Precio,
            imagen: plato.Foto,
          };
          this.platoItems.push(platoItem);
        }
      });
    });
  }
  //#endregion
  increment() {
    this.currentNumber++;
  }

  decrement() {
    if (this.currentNumber > 0) {
      this.currentNumber--;
    }
  }
  activeCatogory(index: number) {
    for (const [i, value] of this.categoriesMenu.entries()) {
      if (i === index) {
        value.active = true;
      } else {
        value.active = false;
      }
    }
    if (index == 0) {
      this.menuActivated = true;
      console.log(this.menuActivated);
    } else {
      this.menuActivated = false;
      console.log(this.menuActivated);
    }
  }
}
