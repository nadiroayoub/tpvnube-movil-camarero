import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cobro } from 'src/app/model/Cobro';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiCobroService extends ApiService<Cobro> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Cobro';
  }
  getAllCobroOfEmpleado(empleadoId: string): Observable<Cobro[]> {
    var endpoint = `${this.apiUrl}/GetAllCobroOfEmpleado?idEmpleado=${empleadoId}`;
    return this.httpClient
      .get<Cobro[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}
