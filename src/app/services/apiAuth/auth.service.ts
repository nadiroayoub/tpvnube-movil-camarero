import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse, Usuario } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  private apiUrl: string = environment.apiUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(private http: HttpClient) {}
  registro(name: string, email: string, password: string) {
    const url = `${this.apiUrl}/EmpleadoAnom/Nuevo`;
    const body = { email, password, name };

    return this.http.post<AuthResponse>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  login(Email: string, Pass: string) {
    const url = `${this.apiUrl}/EmpleadoAnom/Login`;
    const body = { Email, Pass };

    return this.http.post<string>(url, body).pipe(
      tap((resp) => {
        console.log(resp);
        if (resp != '') {
          localStorage.setItem('token', resp);
        }
      }),
      map((resp) => resp),
      catchError((err) => of(err))
    );
  }

  validarToken(): Observable<boolean> {
    const url = `${this.apiUrl}/auth/renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<AuthResponse>(url, { headers }).pipe(
      map((resp) => {
        localStorage.setItem('token', resp.token!);
        this._usuario = {
          name: resp.name!,
          uid: resp.uid!,
          email: resp.email!,
        };

        return resp.ok;
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.clear();
  }
}
