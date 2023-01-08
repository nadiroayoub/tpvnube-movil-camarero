import { HttpClient } from '@angular/common/http';
import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../model/user/User';
import { EmpleadoService } from '../apiEmpleado/empleado.service';
import { MesaService } from '../apiMesa/mesa.service';
import { Usuario } from '../../interfaces/interfaces';

@Injectable()
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private _usuario = new BehaviorSubject<Usuario | undefined>(null);
  usuario = this._usuario.asObservable();

  private _imageByte: string | object = '';
  constructor(
    private http: HttpClient,
    private apiEmpleadoService: EmpleadoService,
    private apiMesaService: MesaService
  ) {
  }

  get imageByte() {
    return this._imageByte;
  }
  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>((observar) => {
      setTimeout(() => {
        if (email == 'error@email.com') {
          observar.error({ message: 'Email not found' });
        }
        observar.next();
        observar.complete();
      }, 3000);
    });
  }

  validarToken(token: string) {
    const url = `${this.apiUrl}/Empleado`;
    const headers = {
      Authorization: token,
    };
    this.http.get<AuthResponse>(url, { headers: headers }).subscribe((resp) => {
      sessionStorage.setItem('token', sessionStorage.getItem('token')!);
      var filename;
      this.apiMesaService
        .getAllMesaOfNegocio(resp.Negocio.Id)
        .subscribe((res) => {
          resp.Negocio.Mesas = res;
          var usuarioLocal;
          usuarioLocal = {
            Id: resp.Id!,
            Nombre: resp.Nombre!,
            Apellidos: resp.Apellidos!,
            Telefono: resp.Telefono!,
            Email: resp.Email!,
            Dni: resp.Dni!,
            Pass: resp.Pass!,
            Foto: resp.Foto!,
            Negocio: resp.Negocio,
          };
          filename = usuarioLocal.Foto.split('/').pop()!;
          this.apiEmpleadoService
            .getImage(resp.Id, filename.substring(0, filename.lastIndexOf('.')))
            .subscribe((res) => {
              usuarioLocal.Id, filename.substring(0, filename.lastIndexOf('.'));
              this._imageByte = res;
            });
          this._usuario.next(usuarioLocal);
        });
      return true;
    });
  }
  login(Email: string, Pass: string): Observable<User> {
    const url = `${this.apiUrl}/EmpleadoAnom/Login`;
    const body = { Email, Pass };
    return new Observable<User>((observer) => {
      this.http.post<string>(url, body).subscribe(
        (data) => {
          if (data == '') {
            observer.error({ message: 'Usuario no existe' });
            observer.next();
          } else {
            const usuario = new User();
            sessionStorage.setItem('token', data);
            this.validarToken(data);
            observer.next(usuario);
          }
          observer.complete();
        },
        () => observer.error()
      );
    });
  }
  logout() {
    sessionStorage.removeItem('token');
  }
}
