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

  createCuenta(
    total: number,
    resource: any,
    negocioId: number
  ): Observable<string> {
    var endpoint = `${this.apiUrl}/CreateCuenta?total=${total}&negocioId=${negocioId}`;
    return this.httpClient
      .post<string>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
  addPostCobroSpecific(
    p_monto,
    p_comanda,
    p_tipocobro,
    p_caja,
    p_empleado,
    p_negocio
  ): Observable<any> {
    var endpoint = `${this.apiUrl}/Nuevo?p_monto=${p_monto}&p_comanda=${p_comanda}&p_tipocobro=${p_tipocobro}&p_caja=${p_caja}&p_empleado=${p_empleado}&p_negocio=${p_negocio}`;
    var resource;
    return this.httpClient
      .post(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
