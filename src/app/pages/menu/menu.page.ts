import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'src/app/model/Menu';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiMenuService } from '../../services/apiMenu/api-menu.service';
import { MesaService } from '../../services/apiMesa/mesa.service';
import { ApiPlatoService } from '../../services/apiPlato/api-plato.service';
import { PostComanda } from 'src/app/model/Comanda';
import { Estado, Mesa } from 'src/app/model/Mesa';
import { ApiLineaComandaService } from '../../services/apiLineaComanda/api-linea-Comanda.service';
import { PostLineaComanda } from '../../model/LineaComanda';
import { ApiComandaService } from 'src/app/services/apiComanda/api-Comanda.service';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  categoriesMenu: { nombre: string; imagen: string; active: boolean }[];
  menuItems: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    numeroDeComanda: number;
  }[] = [];
  platoItems: {
    id: number;
    nombre: string;
    precio: number;
    imagen: string;
    numeroDeComanda: number;
  }[] = [];
  public active: number[] = [];
  currentNumber = 0;
  dataComing: Mesa;
  menuActivated = true;
  menuImagenes: any[] = [];
  platoImagenes: any[] = [];
  usuario;
  constructor(
    public activatedRoute: ActivatedRoute,
    private apiMenuService: ApiMenuService,
    private apiPlatoService: ApiPlatoService,
    private apiAuthService: AuthService,
    private router: Router,
    private apiComandaService: ApiComandaService,
    private apiLineaComandaService: ApiLineaComandaService,
    private apiMesaService: MesaService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.apiAuthService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.dataComing = JSON.parse(this.activatedRoute.snapshot.params.data);
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
            numeroDeComanda: 0,
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
            numeroDeComanda: 0,
          };
          this.platoImagenes.push(this.convertUrl(plato.Foto, 'PlatosImages'));
          this.platoItems.push(platoItem);
        }
      });
    });
  }
  //#endregion
  incrementPedido(item: any) {
    item.numeroDeComanda++;
  }

  decrementPedido(item: any) {
    if (item.numeroDeComanda > 0) {
      item.numeroDeComanda--;
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
  confirmarComanda() {
    console.log(this.menuItems);
    console.log(this.platoItems);
    //create commanda passing (comandaEstado, mesa, empleado)
    var postComanda: PostComanda = {
      EstadoComanda: 1,
      Mesa_oid: this.dataComing.Id,
      Empleado_oid: 1,
    };
    this.apiComandaService
      .addPostComandaSpecific(postComanda)
      .subscribe((idComanda) => {
        // create nuevalineaMenu (passing comanda, cantidad, menu)
        this.menuItems.forEach((menu) => {
          var lineaComanda: PostLineaComanda = {
            Id: idComanda,
            Cantidad: menu.numeroDeComanda,
            Menu_oid: menu.id,
            Plato_oid: 0,
          };
          var response = this.checkDuplicate(lineaComanda, 'menu');
          if (response) {
            console.log('Inside');
            return;
          }
        });
        // create nuevalineaPlato (passing comanda, cantidad, plato)
        this.platoItems.forEach((plato) => {
          var lineaComanda: PostLineaComanda = {
            Id: idComanda,
            Cantidad: plato.numeroDeComanda,
            Menu_oid: 0,
            Plato_oid: plato.id,
          };
          var response = this.checkDuplicate(lineaComanda, 'plato');
          if (response) {
            console.log('Inside');
            return;
          }
        });
        // modify status of mesa
        this.dataComing.Estado = Estado.ocupado;
        this.apiMesaService
          .update('idMesa', this.dataComing.Id, this.dataComing)
          .subscribe((res) => {
            console.log('mesa editado' + res);
            this.presentToast(
              'Comanda creada',
              'bottom',
              'success',
              'checkmark'
            );
          });
        // go back to home page
        this.router.navigate(['/home']);
      });
  }
  finalizarComanda() {
    // TODO: check if there menuItems and platoItems are empty
    // TODO: change mesa status
    // TODO: go to cobro page
    // TODO: send data to cobro page
  }
  cancelarComanda() {
    //TODO: clear out menuItems and platoItems
    //TODO: go to home page
  }
  //#endregion

  //#region await for subscribe methods
  postLineaMenuData(lineaComanda, itemType): Observable<any> {
    if ((itemType = 'plato')) {
      return this.apiLineaComandaService.nuevaLineaPlato(lineaComanda);
    } else {
      return this.apiLineaComandaService.nuevaLineaMenu(lineaComanda);
    }
  }

  async checkDuplicate(postLineaMenuData, itemType: 'plato' | 'menu') {
    var response = await this.postLineaMenuData(
      postLineaMenuData,
      itemType
    ).toPromise();
    if (response) {
      console.log('Inside');
    }
    return response;
  }

  async proceed(postLineaMenuData, itemType) {
    await this.checkDuplicate(postLineaMenuData, itemType);
    console.log('finished');
  }
  //#endregion
  //#region Toast message
  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    estado: 'success' | 'danger',
    icon: 'checkmark' | 'close'
  ) {
    const toast = await this.toastController.create({
      message: `<ion-icon name="${icon}-circle-outline"></ion-icon> ${message}`,
      duration: 1500,
      position: position,
      color: estado,
    });
    return toast;
  }
  //#endregion
}
