import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LineaComanda, PostLineaComanda } from 'src/app/model/LineaComanda';
import { Comanda } from 'src/app/model/Comanda';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiLineaComandaService extends ApiService<LineaComanda> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'LineaComanda';
  }

  nuevaLineaPlato(
    p_comanda: number,
    p_cantidad: number,
    p_plato: number
  ): Observable<PostLineaComanda | Comanda> {
    var endpoint = `${this.apiUrl}/NuevaLineaPlato?p_comanda=${p_comanda}&p_cantidad=${p_cantidad}&p_plato=${p_plato}`;
    var resource;
    return this.httpClient
      .post<Comanda>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
  nuevaLineaMenu(
    p_comanda: number,
    p_cantidad: number,
    p_menu: number
  ): Observable<PostLineaComanda | Comanda> {
    var endpoint = `${this.apiUrl}/NuevaLineaMenu?p_comanda=${p_comanda}&p_cantidad=${p_cantidad}&p_menu=${p_menu}`;
    var resource;
    return this.httpClient
      .post<Comanda>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
