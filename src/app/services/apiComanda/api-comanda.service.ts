import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Comanda } from 'src/app/model/Comanda';
import { ApiService } from '../apiService/api.service';
import { PostComanda } from '../../model/Comanda';

@Injectable({
  providedIn: 'root',
})
export class ApiComandaService extends ApiService<Comanda> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Comanda';
  }

  getComandaOfCobro(cobroId: string | number): Observable<Comanda> {
    var endpoint = `${this.apiUrl}/GetComandaOfCobro?idCobro=${cobroId}`;
    return this.httpClient
      .get<Comanda>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  getAllComandaOfMesa(mesaId: string | number): Observable<Comanda[]> {
    var endpoint = `${this.apiUrl}/GetAllComandaOfMesa?idMesa=${mesaId}`;
    return this.httpClient
      .get<Comanda[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
  addPostComandaSpecific(resource: PostComanda): Observable<any> {
    var endpoint = `${this.apiUrl}/Nuevo`;
    return this.httpClient
      .post(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
