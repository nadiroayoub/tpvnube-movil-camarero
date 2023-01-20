import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Comanda, CuentaComanda } from 'src/app/model/Comanda';
import { ApiCobroService } from 'src/app/services/apiCobro/api-cobro.service';
import { ApiComandaService } from '../../services/apiComanda/api-comanda.service';

import { AuthService } from 'src/app/services/auth/auth.service';

import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { MesaService } from 'src/app/services/apiMesa/mesa.service';

import { ApiClienteService } from '../../services/apiCliente/api-cliente.service';

import { ApiFacturaService } from '../../services/apiFactura/api-factura.service';
import { Negocio } from '../../model/Negocio';

@Component({
  selector: 'app-cuenta',
  templateUrl: './comandas.page.html',
  styleUrls: ['./comandas.page.scss'],
})
export class ComandasPage implements OnInit {
  currentNumber = 0;
  menuItems: CuentaComanda[];
  public cuentaDescargada = false;
  public cobroHecho = false;
  public dataComingFromMenuPage;
  public listaComanda = [];
  public showComanda = true;
  public precioTotal: number = 0;
  usuario;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiComandaService: ApiComandaService,
    private apiCobroService: ApiCobroService,
    private loader: LoadingController,
    private authService: AuthService,
    private apiNegocioService: ApiNegocioService,
    private toastController: ToastController,
    private aApiMesaService: MesaService,
    private apiClienteService: ApiClienteService,
    private apiFacturaService: ApiFacturaService
  ) {}

  ionViewDidEnter() {
    this.listaComanda = [];
    this.ngOnInit();
  }
  ngOnInit() {
    this.authService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['mesa'] == undefined) {
        this.dataComingFromMenuPage = JSON.parse(
          this.activatedRoute.snapshot.params.mesa
        );
      } else {
        this.dataComingFromMenuPage = JSON.parse(params['mesa']);
      }
    });
    // mesa id
    // console.log(this.dataComingFromMenuPage.Id);
    this.apiComandaService
      .getAllComandaOfMesa(this.dataComingFromMenuPage.Id)
      .subscribe((comandas: Comanda[]) => {
        console.log(comandas);
        comandas.forEach((comanda) => {
          var comandaItems: CuentaComanda[] = [];
          comanda.AllLineaComandaOfComanda.forEach((lineaComanda: any) => {
            comandaItems.push({
              Nombre:
                lineaComanda.PlatoOfLineaComanda == null
                  ? lineaComanda.MenuOfLineaComanda.Nombre
                  : lineaComanda.PlatoOfLineaComanda.Nombre,
              Foto:
                lineaComanda.PlatoOfLineaComanda == null
                  ? this.convertUrl(
                      lineaComanda.MenuOfLineaComanda.Foto,
                      'MenusImages'
                    )
                  : this.convertUrl(
                      lineaComanda.PlatoOfLineaComanda.Foto,
                      'PlatosImages'
                    ),
              Precio:
                lineaComanda.PlatoOfLineaComanda == null
                  ? lineaComanda.MenuOfLineaComanda.Precio
                  : lineaComanda.PlatoOfLineaComanda.Precio,
              Cantidad: lineaComanda.Cantidad,
            });
            this.precioTotal +=
              lineaComanda.PlatoOfLineaComanda == null
                ? lineaComanda.MenuOfLineaComanda.Precio * lineaComanda.Cantidad
                : lineaComanda.PlatoOfLineaComanda.Precio *
                  lineaComanda.Cantidad;
          });
          this.listaComanda.push({
            nombre: comanda.EstadoComanda,
            items: comandaItems,
            Id: comanda.Id,
            Pdf: comanda.Pdf,
          });
          console.log(this.listaComanda);
        });
      });
  }
  openCuentaAlreadyCreated(filename) {
    var data = { filename, mesa: this.dataComingFromMenuPage };
    let navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data),
      },
    };
    this.router.navigate(['/pdf-viewer'], navigationExtras);
  }
  openCobrarPage(comanda) {
    if (comanda.Pdf == '' || comanda.nombre == 1) {
      this.apiComandaService.get(comanda.Id).subscribe((comandaFromBack) => {
        // TODO: go to cobrar page to show comanda details and pass comanda data
        let navigationExtras: NavigationExtras = {
          queryParams: {
            comanda: JSON.stringify(comandaFromBack),
          },
        };
        this.router.navigate(['/cobrar'], navigationExtras);
      });
    }
  }
  openCuenta() {
    this.cuentaDescargada = true;
    this.apiCobroService
      .createCuenta(
        this.precioTotal,
        this.listaComanda,
        this.usuario.Negocio.Id
      )
      .subscribe((filename: string) => {
        //TODO: change mesa status
        // this.dataComingFromMenuPage.Estado = Estado.pendientePago;
        this.aApiMesaService
          .update(
            'idMesa',
            this.dataComingFromMenuPage.Id,
            this.dataComingFromMenuPage
          )
          .subscribe((res) => {
            this.toastController.create;
            this.presentToast(
              "Nuevo estado de mesa: 'Pendiente de pago'",
              'bottom',
              'success',
              'checkmark'
            ).then((toast) => {
              toast.present();
            });
            setTimeout(() => {
              // TODO: go to pdf viewr to show cuenta and pass filename of the pdf (cuenta)
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  filename: JSON.stringify(filename),
                },
              };
              this.router.navigate(['/pdf-viewer'], navigationExtras);
            }, 1500);
          });
      });
  }
  openFactura() {
    if (this.cobroHecho === true) {
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
  // cobrar() {
  //   this.cobroHecho = true;
  //   this.authService.usuario.subscribe((usuario: any) => {
  //     // TODO: To discuss: important data to create cobro
  //     this.apiNegocioService
  //       .get(usuario.Negocio.Id)
  //       .subscribe((negocio: any) => {
  //         var cobro = {
  //           Id: 0,
  //           Monto: 0,
  //           Comanda_oid: 0,
  //           Cliente_oid: 0,
  //           TipoDeCobro: 'string',
  //           TipoCobro_oid: 0,
  //           Caja_oid: negocio.CajaOfNegocio[0],
  //           NumeroTransaccion: 'string',
  //           Empleado_oid: usuario.Id,
  //           Negocio_oid: negocio.Id,
  //         };
  //         this.apiCobroService.addPostCobroSpecific(cobro).subscribe({
  //           next: (res) => {
  //             // TODO: modify commanda status after creating cobro 1--> 2
  //             this.presentToast(
  //               '¡Cobro creado!',
  //               'bottom',
  //               'success',
  //               'checkmark'
  //             ).then((toast) => {
  //               toast.present();
  //             });
  //             return res;
  //           },
  //           error: () => {
  //             this.presentToast(
  //               '¡Error al crear cobro!',
  //               'bottom',
  //               'danger',
  //               'close'
  //             ).then((toast) => {
  //               toast.present();
  //             });
  //           },
  //         });
  //       });
  //   });
  // }
  //#region toggle comandas
  hideMenuItems(comanda) {
    console.log(comanda);
    this.showComanda = !this.showComanda;
  }
  //#endregion

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

  //#region toast message
  async presentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    estado: 'success' | 'danger',
    icon: 'checkmark' | 'close'
  ) {
    const toast = await this.toastController.create({
      message: `<ion-icon name="${icon}-circle-outline"></ion-icon> ${message}`,
      duration: 2000,
      position: position,
      color: estado,
    });
    return toast;
  }
  //#endregion
}
