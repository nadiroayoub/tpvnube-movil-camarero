import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Factura } from 'src/app/model/Factura';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiFacturaService extends ApiService<Factura> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Factura';
  }
  createFactura(total: number, resource: any): Observable<string> {
    var endpoint = `${this.apiUrl}/CreateFactura?total=${total}`;
    return this.httpClient
      .post<string>(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }
}
