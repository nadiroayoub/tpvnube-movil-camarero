import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Mesa } from 'src/app/model/Mesa';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class MesaService extends ApiService<Mesa> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Mesa';
  }

  getAllMesaOfNegocio(id: string | number): Observable<Mesa[]> {
    var endpoint = `${this.apiUrl}/GetAllMesaOfNegocio?idNegocio=${id}`;
    return this.httpClient
      .get<Mesa[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
