import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plato } from 'src/app/model/Plato';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class ApiPlatoService extends ApiService<Plato> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Plato';
  }
  // getAllCobroOfEmpleado(empleadoId: string): Observable<Cobro[]> {
  //   var endpoint = `${this.apiUrl}/GetAllCobroOfEmpleado?idEmpleado=${empleadoId}`;
  //   return this.httpClient
  //     .get<Cobro[]>(`${endpoint}`)
  //     .pipe(catchError(this.handleError));
  // }
}
