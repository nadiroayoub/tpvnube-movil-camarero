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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private apiCobroService: ApiCobroService,
    private apiAuthService: AuthService,
    private apiComandaService: ApiComandaService
  ) {}
  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    // setTimeout(() => (this.dataSource.paginator = this.paginator));
    console.log(this.usuario);
    setTimeout(() => {
      this.apiAuthService.usuario.subscribe((res) => {
        this.usuario = res;
        console.log(this.usuario);
        this.apiCobroService
          .getAllCobroOfEmpleado(this.usuario.Id)
          .subscribe((cobros) => {
            // get Comanda of cobro
            cobros.forEach((cobro) => {
              this.apiComandaService
                .getComandaOfCobro(cobro.Id)
                .subscribe((Comanda) => {
                  this.dataSourceFromService.push({
                    mesa: Comanda.MesaComanda.Numero,
                    fecha: cobro.Fecha,
                    importe: cobro.Monto,
                  });
                });
            });
            this.dataSource.data = this.dataSourceFromService;
            console.log(this.dataSource.data);
            // this.dataSource.sort = this.sort;
            // this.dataSource.paginator = this.paginator;
          });
      });
    }, 500);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
