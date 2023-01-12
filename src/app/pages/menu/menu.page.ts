import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  menuImagenes: any[] = [];
  platoImagenes: any[] = [];
  usuario;
  constructor(
    public activatedRoute: ActivatedRoute,
    private apiMenuService: ApiMenuService,
    private apiPlatoService: ApiPlatoService,
    private apiAuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiAuthService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.dataComing = this.activatedRoute.snapshot.params.data;
    this.dataComing = JSON.parse(this.dataComing);
    console.log(this.dataComing);
    console.log(this.usuario);
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
    this.apiMenuService.getList().subscribe((menus: Menu[]) => {
      menus.forEach((menu) => {
        if (menu.NegocioMenu.Id == this.usuario.Negocio.Id) {
          var menuItem = {
            id: menu.Id,
            nombre: menu.Nombre,
            precio: menu.Precio,
            imagen: menu.Foto,
            numeroDePedido: 0,
          };
          this.menuImagenes.push(this.convertUrl(menu.Foto, 'MenusImages'));
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
        if (plato.NegocioPlato.Id == this.usuario.Negocio.Id) {
          var platoItem = {
            id: plato.Id,
            nombre: plato.Nombre,
            precio: plato.Precio,
            imagen: plato.Foto,
            numeroDePedido: 0,
          };
          this.platoImagenes.push(this.convertUrl(plato.Foto, 'PlatosImages'));
          this.platoItems.push(platoItem);
        }
      });
    });
  }
  //#endregion
  incrementPedido(item: any) {
    item.numeroDePedido++;
  }

  decrementPedido(item: any) {
    if (item.numeroDePedido > 0) {
      item.numeroDePedido--;
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

  //#region load menu and plato images
  convertUrl(absoluteUtlFoto: string, ruta: string) {
    var filename = absoluteUtlFoto.split('/').pop();
    var relativeImgUrl;
    if (absoluteUtlFoto != '') {
      relativeImgUrl = 'assets/images/' + ruta + '/' + filename;
    } else {
      relativeImgUrl = '';
    }
    return relativeImgUrl;
  }

  //#endregion

  //#region
  confirmarPedido() {
    console.log(this.menuItems);
    console.log(this.platoItems);
    //create commanda (passing comandaEstado, mesa, empleado)
    // cerate nuevalineaMenu (passing comanda, cantidad, menu)
    // cerate nuevalineaPlato (passing comanda, cantidad, plato)
    // go back to home page
    this.router.navigate(['/home']);
  }
  //#endregion
}
