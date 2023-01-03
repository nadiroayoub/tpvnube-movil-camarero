import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment.prod';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  protected readonly apiUrl = environment.apiUrl + `/${this.getResourceUrl()}`;

  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  getList(): Observable<T[]> {
    var endpoint = `${this.apiUrl}/ReadAll`;
    return this.httpClient
      .get<T[]>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }

  get(id: string | number): Observable<T> {
    var endpoint = `${this.apiUrl}`;
    return this.httpClient
      .get<T>(`${endpoint}/${id}`)
      .pipe(catchError(this.handleError));
  }

  add(resource: T): Observable<any> {
    var endpoint = `${this.apiUrl}/Nuevo`;
    return this.httpClient
      .post(`${endpoint}`, resource)
      .pipe(catchError(this.handleError));
  }

  delete(idName: string, id: string | number): Observable<any> {
    var endpoint = `${this.apiUrl}/Eliminar`;
    return this.httpClient
      .delete(`${endpoint}?${idName}=${id}`)
      .pipe(catchError(this.handleError));
  }

  update(idName: string, id: string | number, resource: T) {
    var endpoint = `${this.apiUrl}/Modificar`;
    return this.httpClient
      .put(`${endpoint}?${idName}=${id}`, resource)
      .pipe(catchError(this.handleError));
  }

  protected handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }

}
