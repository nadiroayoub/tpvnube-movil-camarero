import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/model/Cliente';
import { ApiService } from '../apiService/api.service';

@Injectable({
  providedIn: 'root',
})
export class ApiClienteService extends ApiService<Cliente> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }
  getResourceUrl(): string {
    return 'Cliente';
  }
}
