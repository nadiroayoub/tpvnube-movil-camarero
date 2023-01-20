import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ApiCobroService } from '../../services/apiCobro/api-cobro.service';
import { ApiAuthService } from 'src/app/services/apiAuth/auth.service';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { ApiComandaService } from 'src/app/services/apiComanda/api-Comanda.service';

export interface Data {
  movies: string;
}

@Component({
  selector: 'app-cobros',
  templateUrl: './cobros.page.html',
  styleUrls: ['./cobros.page.scss'],
})
export class CobrosPage implements OnInit {
  public data: Data;
  public columns: any;
  public rows: any;
  public flex: any;
  public auto: any;
  usuario: any;
  subscription: Subscription;

  displayedColumns: string[] = ['mesa', 'fecha', 'importe'];
  dataSourceFromService: any[] = [];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private http: HttpClient,
    private apiCobroService: ApiCobroService,
    private apiAuthService: AuthService,
    private apiComandaService: ApiComandaService
  ) {}
  ngOnInit(): void {
    this.apiAuthService.usuario.subscribe((res) => {
      this.usuario = res;
      this.apiCobroService
        .getAllCobroOfEmpleado(this.usuario.Id)
        .subscribe((cobros) => {
          // get Comanda of cobro
          cobros.forEach((cobro) => {
            this.apiComandaService
              .getComandaOfCobro(cobro.Id)
              .subscribe((Comanda) => {
                this.dataSource.data.push({
                  mesa: Comanda.MesaOfComanda.Numero,
                  fecha: cobro.Fecha,
                  importe: cobro.Monto,
                });
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              });
          });
        });
    });
  }
  ionViewDidEnter() {
    // this.dataSource.data = this.dataSourceFromService;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  // ngAfterViewInit(): void {
  //   this.dataSource.sort = this.sort;
  //   this.dataSource.paginator = this.paginator;
  // }
  // SetTableProperties() {
  //   this.dataSource.paginator = this.paginator;
  // }
}
