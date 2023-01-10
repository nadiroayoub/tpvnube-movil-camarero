import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/model/Menu';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiMenuService extends ApiService<Menu> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Menu';
  }
  // getAllCobroOfEmpleado(empleadoId: string): Observable<Cobro[]> {
  //   var endpoint = `${this.apiUrl}/GetAllCobroOfEmpleado?idEmpleado=${empleadoId}`;
  //   return this.httpClient
  //     .get<Cobro[]>(`${endpoint}`)
  //     .pipe(catchError(this.handleError));
  // }
}
