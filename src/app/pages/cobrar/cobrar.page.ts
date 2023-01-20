import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { Comanda, CuentaComanda } from 'src/app/model/Comanda';
import { Estado } from 'src/app/model/Mesa';
import { ApiClienteService } from 'src/app/services/apiCliente/api-cliente.service';
import { ApiCobroService } from 'src/app/services/apiCobro/api-cobro.service';
import { ApiComandaService } from 'src/app/services/apiComanda/api-Comanda.service';
import { ApiFacturaService } from 'src/app/services/apiFactura/api-factura.service';
import { MesaService } from 'src/app/services/apiMesa/mesa.service';
import { ApiNegocioService } from 'src/app/services/apiNegocio/api-negocio.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EstadoComanda } from '../../model/Comanda';

@Component({
  selector: 'app-cobrar',
  templateUrl: './cobrar.page.html',
  styleUrls: ['./cobrar.page.scss'],
})
export class CobrarPage implements OnInit {
  menuItems: { nombre: string; precio: string; imagen: string }[];
  public cobroHecho = false;
  public facturaLista = false;
  public listaComanda = [];
  public cuentaDescargada = false;
  comanda;
  public precioTotal: number = 0;
  public dataComingFromComandasPage;
  comandaItems: CuentaComanda[] = [];
  usuario;
  pago;
  tipoCobroTarjeta = undefined;
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
  ) {
    console.log('ok');
  }
  ionViewDidEnter() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['data'] != undefined) {
        this.listaComanda = [];
        var comandaId = JSON.parse(params['data']).comandaId;
        //TODO: get all lineacomanda of comanda
        this.apiComandaService
          .get(comandaId)
          .subscribe((comandaFromBack: Comanda) => {
            this.comanda = comandaFromBack;
            comandaFromBack.AllLineaComandaOfComanda.forEach(
              (lineaComanda: any) => {
                this.comandaItems.push({
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
                    ? lineaComanda.MenuOfLineaComanda.Precio
                    : lineaComanda.PlatoOfLineaComanda.Precio;
              }
            );
            this.listaComanda.push({
              nombre: comandaFromBack.EstadoComanda,
              items: this.comandaItems,
              Id: comandaFromBack.Id,
            });
          });
      }
    });
  }
  ngOnInit() {
    this.authService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['comanda'] == undefined) {
        this.dataComingFromComandasPage = JSON.parse(
          this.activatedRoute.snapshot.params.data
        );
        this.apiComandaService
          .getAllComandaOfMesa(this.dataComingFromComandasPage.Id)
          .subscribe((comandas) => {
            comandas.forEach((comandaFromBack: Comanda) => {
              if (comandaFromBack.EstadoComanda == EstadoComanda.comanda) {
                comandaFromBack.AllLineaComandaOfComanda.forEach(
                  (lineaComanda: any) => {
                    this.comandaItems.push({
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
                        ? lineaComanda.MenuOfLineaComanda.Precio
                        : lineaComanda.PlatoOfLineaComanda.Precio;
                  }
                );
                this.listaComanda.push({
                  nombre: comandaFromBack.EstadoComanda,
                  items: this.comandaItems,
                  Id: comandaFromBack.Id,
                });
              }
            });
          });
      } else {
        this.dataComingFromComandasPage = JSON.parse(params['comanda']);
        //TODO: get all lineacomanda of comanda
        this.apiComandaService
          .get(this.dataComingFromComandasPage.Id)
          .subscribe((comandaFromBack: Comanda) => {
            comandaFromBack.AllLineaComandaOfComanda.forEach(
              (lineaComanda: any) => {
                this.comandaItems.push({
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
                    ? lineaComanda.MenuOfLineaComanda.Precio *
                      lineaComanda.Cantidad
                    : lineaComanda.PlatoOfLineaComanda.Precio *
                      lineaComanda.Cantidad;
              }
            );
            this.listaComanda.push({
              nombre: comandaFromBack.EstadoComanda,
              items: this.comandaItems,
              Id: comandaFromBack.Id,
            });
          });
      }
    });
  }
  setPago(value) {
    this.pago = value;
  }
  elegirMetodoPago(event) {
    // TODO: change style of the element
    var target = event.target;
    var elements = document.querySelectorAll('ion-chip');
    if (target.tagName != 'ION-CHIP') {
      target = target.parentElement;
      if ((target as Element).classList.contains('efectivo')) {
        this.tipoCobroTarjeta = false;
        elements[0].classList.remove('active');
        elements[1].classList.add('active');
        elements[2].classList.add('active');
      } else if ((target as Element).classList.contains('tarjeta')) {
        this.tipoCobroTarjeta = true;
        elements[0].classList.add('active');
        elements[1].classList.remove('active');
        elements[2].classList.remove('active');
      }
    } else {
      if ((target as Element).classList.contains('efectivo')) {
        this.tipoCobroTarjeta = false;
        elements[0].classList.remove('active');
        elements[1].classList.add('active');
        elements[2].classList.add('active');
      } else if ((target as Element).classList.contains('tarjeta')) {
        this.tipoCobroTarjeta = true;
        elements[0].classList.add('active');
        elements[1].classList.remove('active');
        elements[2].classList.remove('active');
      }
    }
    console.log(this.tipoCobroTarjeta);
    // this.cobroHecho = !this.cobroHecho;
  }
  openCuenta() {
    // show message to await the creation of ticket
    this.toastController.create;
    this.specificPresentToast(
      'El ticket se está Cargando...',
      'bottom',
      'success',
      'checkmark',
      'loading-notification'
    ).then((toast) => {
      toast.present();
    });
    // change status of cuenta
    this.cuentaDescargada = true;
    this.apiCobroService
      .createCuenta(
        this.precioTotal,
        this.listaComanda,
        this.usuario.Negocio.Id
      )
      .subscribe((filename: string) => {
        //TODO: change mesa status to pendiente pago
        this.dataComingFromComandasPage.MesaOfComanda.Estado =
          Estado.pendientePago;
        this.aApiMesaService
          .update(
            'idMesa',
            this.dataComingFromComandasPage.MesaOfComanda.Id,
            this.dataComingFromComandasPage.MesaOfComanda
          )
          .subscribe((res) => {
            this.dataComingFromComandasPage.Pdf = filename;
            this.apiComandaService
              .update(
                'idComanda',
                this.dataComingFromComandasPage.Id,
                this.dataComingFromComandasPage
              )
              .subscribe((res) => {
                // TODO: go to pdf viewr to show cuenta and pass filename of the pdf (cuenta)
                let navigationExtras: NavigationExtras = {
                  queryParams: {
                    data: JSON.stringify({
                      filename: filename,
                      comandaId: this.dataComingFromComandasPage.Id,
                    }),
                  },
                };
                this.router.navigate(['/pdf-viewer'], navigationExtras);
              });
          });
      });
  }
  openFactura() {
    if (this.facturaLista === true) {
      var data = {
        listaComanda: this.listaComanda,
        precioTotal: this.precioTotal,
        comandaId: this.dataComingFromComandasPage.Id,
        usuario: this.usuario,
      };
      let navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(data),
        },
      };
      this.router.navigate(['/factura'], navigationExtras);

      const btn = document.querySelector(
        'imprimirCuenta'
      ) as HTMLButtonElement | null;
      if (btn != null) {
        btn.disabled = true;
        btn.classList.remove('active');
      }
    }
  }
  cobrar() {
    this.cobroHecho = true;
    this.authService.usuario.subscribe((usuario: any) => {
      // TODO: To discuss: important data to create cobro
      this.apiNegocioService
        .get(usuario.Negocio.Id)
        .subscribe((negocio: any) => {
          var cobro = {
            Id: 0,
            Monto: 0,
            Comanda_oid: 0,
            Cliente_oid: 0,
            TipoDeCobro: 'string',
            TipoCobro_oid: 0,
            Caja_oid: negocio.CajaOfNegocio[0],
            NumeroTransaccion: 'string',
            Empleado_oid: usuario.Id,
            Negocio_oid: negocio.Id,
          };
          this.apiCobroService
            .addPostCobroSpecific(
              this.precioTotal,
              this.dataComingFromComandasPage.Id,
              this.tipoCobroTarjeta ? 327680 : 327681,
              this.usuario.Negocio.CajaOfNegocio[0].Id,
              this.usuario.Id,
              this.usuario.Negocio.Id
            )
            .subscribe({
              next: (res) => {
                // TODO: change mesa status to disponible
                this.dataComingFromComandasPage.MesaOfComanda.Estado =
                  Estado.disponible;
                this.aApiMesaService
                  .update(
                    'idMesa',
                    this.dataComingFromComandasPage.MesaOfComanda.Id,
                    this.dataComingFromComandasPage.MesaOfComanda
                  )
                  .subscribe((res) => {
                    // TODO: modify commanda status after creating cobro 1--> 2
                    // TODO: change status of comanda to preparada
                    this.dataComingFromComandasPage.EstadoComanda =
                      EstadoComanda.preparado;
                    this.apiComandaService
                      .update(
                        'idComanda',
                        this.dataComingFromComandasPage.Id,
                        this.dataComingFromComandasPage
                      )
                      .subscribe((res) => {});
                    this.presentToast(
                      '¡Cobro hecho!',
                      'bottom',
                      'success',
                      'checkmark'
                    ).then((toast) => {
                      toast.present();
                      this.facturaLista = true;
                    });
                  });
                return res;
              },
              error: () => {
                this.presentToast(
                  '¡Error al crear cobro!',
                  'bottom',
                  'danger',
                  'close'
                ).then((toast) => {
                  toast.present();
                });
              },
            });
        });
    });
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
  async specificPresentToast(
    message: string,
    position: 'top' | 'middle' | 'bottom',
    estado: 'success' | 'danger',
    icon: 'checkmark' | 'close',
    classname
  ) {
    const toast = await this.toastController.create({
      message: `<ion-spinner></ion-spinner> ${message}`,
      duration: 2000,
      position: position,
      color: estado,
      cssClass: 'loading-notification',
    });
    return toast;
  }
  //#endregion
}
