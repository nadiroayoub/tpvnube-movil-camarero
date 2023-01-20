import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Mesa } from 'src/app/model/Mesa';
import { MesaService } from 'src/app/services/apiMesa/mesa.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiComandaService } from '../../services/apiComanda/api-comanda.service';

@Component({
  selector: 'app-mesas',
  templateUrl: './mesas.page.html',
  styleUrls: ['./mesas.page.scss'],
})
export class MesasPage implements OnInit {
  mesas: Mesa[] = [];
  enteredSearchValue: any;
  usuario;
  searchable = [];
  disableImageNoData = true;
  private updateUsuarioSubscription: Subscription;
  constructor(
    public router: Router,
    private navCtrl: NavController,
    private apiMesaService: MesaService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private apiComandaService: ApiComandaService
  ) {
    // activatedRoute.params.subscribe((val) => {
    //   // put the code from `ngOnInit` here
    this.mesas = [];
    //   this.getMesas();
    // });
  }
  ionViewDidEnter() {
    console.log('home page');
    console.log('ngonint');
    this.mesas = [];
    this.authService.usuario.subscribe((res) => {
      this.usuario = res;
      this.getMesas();
    });
  }
  ngOnInit() {
    // console.log('ngonint');
    // this.authService.usuario.subscribe((res) => {
    //   this.usuario = res;
    //   this.getMesas();
    // });
  }
  changed() {
    console.log(this.enteredSearchValue);
  }
  getMesas(): any {
    // get mesas from user service
    //get all mesas filtring by user id
    var mesasTodas = [];
    this.apiMesaService.getList().subscribe((mesas) => {
      mesas.forEach((mesaAll) => {
        this.usuario.Negocio.Mesas.forEach((mesa) => {
          if (mesa.Id == mesaAll.Id) {
            // have all mesas de un negocio
            mesasTodas.push(mesaAll);
          }
        });
      });
      var mesasFiltrados = [];
      this.apiComandaService
        .dameComandasEmpleado(this.usuario.Id)
        .subscribe((listaComandas) => {
          mesasTodas.forEach((mesa) => {
            listaComandas.forEach((comanda) => {
              if (comanda.MesaOfComanda.Id == mesa.Id) {
                var index = mesasFiltrados.findIndex((x) => x.Id == mesa.Id);
                // here you can check specific property for an object whether it exist in your array or not
                index === -1
                  ? mesasFiltrados.push(mesa)
                  : console.log('object already exists');
                // mesasFiltrados.push(mesa);
              }
            });
          });
          // add mesas Filtrados to this.mesas
          this.mesas = mesasFiltrados;
          this.searchable = this.mesas;
          this.disableImageNoData = this.mesas.length > 0 ? true : false;
        });
    });
  }
  navigateWithData(mesaNumber: number) {
    this.navCtrl.navigateForward([
      this.mesas[mesaNumber].Estado !== 3 ? 'menu' : 'comandas',
      { mesa: JSON.stringify(this.mesas[mesaNumber]) },
    ]);
  }

  //#region filter by search bar
  setFilteredItems() {
    this.mesas = this.filterItems(this.enteredSearchValue);
  }

  filterItems(needle: string) {
    return this.searchable.filter((item) => {
      // assuming all these data are string type
      const hayStack: string = ('mesa' + item.Numero)
        .split(' ')
        .join('')
        .toLowerCase();

      needle = needle.split(' ').join('').toLowerCase();

      return hayStack.includes(needle);
    });
  }

  //#endregion
}
