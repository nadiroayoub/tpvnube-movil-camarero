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
    resource: PostLineaComanda | Comanda
  ): Observable<PostLineaComanda | Comanda> {
    var endpoint = `${this.apiUrl}/NuevaLineaPlato`;
    return this.httpClient
      .post<Comanda>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
  nuevaLineaMenu(
    resource: PostLineaComanda | Comanda
  ): Observable<PostLineaComanda | Comanda> {
    var endpoint = `${this.apiUrl}/NuevaLineaMenu`;
    return this.httpClient
      .post<Comanda>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
