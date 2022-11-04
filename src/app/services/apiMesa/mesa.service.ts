import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mesa } from 'src/app/pages/home/home.page';
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
}
