import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Negocio } from 'src/app/model/Negocio';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiNegocioService extends ApiService<Negocio> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Negocio';
  }
}
