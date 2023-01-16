import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Cobro } from 'src/app/model/Cobro';
import { ApiService } from '../apiService/api.service';
import { PostCobro } from '../../model/Cobro';

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

  createCuenta(total: number, resource: any): Observable<string> {
    var endpoint = `${this.apiUrl}/CreateCuenta?total=${total}`;
    return this.httpClient
      .post<string>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
  addPostCobroSpecific(resource: PostCobro): Observable<any> {
    var endpoint = `${this.apiUrl}/Nuevo`;
    return this.httpClient
      .post(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
