import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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

  displayedColumns: string[] = ['mesa', 'fecha', 'importe'];
  dataSource = new MatTableDataSource<any>([
    {
      mesa: 'mesa1',
      fecha: new Date(),
      importe: '45€',
    },
    {
      mesa: 'mesa2',
      fecha: new Date(),
      importe: '35€',
    },
    {
      mesa: 'mesa3',
      fecha: new Date(),
      importe: '36€',
    },
    {
      mesa: 'mesa4',
      fecha: new Date(),
      importe: '28€',
    },
  ]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    setTimeout(() => (this.dataSource.paginator = this.paginator));
  }
}
