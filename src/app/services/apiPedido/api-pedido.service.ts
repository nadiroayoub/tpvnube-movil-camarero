import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pedido } from 'src/app/model/Pedido';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiPedidoService extends ApiService<Pedido> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Pedido';
  }

  getPedidoOfCobro(cobroId: string | number): Observable<Pedido> {
    var endpoint = `${this.apiUrl}/GetPedidoOfCobro?idCobro=${cobroId}`;
    return this.httpClient
      .get<Pedido>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
