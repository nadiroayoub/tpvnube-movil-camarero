import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../model/user/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = environment.apiUrl;
  private _usuario!: User;
  constructor(private http: HttpClient) {}

  get usuario() {
    return { ...this._usuario };
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

  login(Email: string, Pass: string): Observable<User> {
    const url = `${this.apiUrl}/EmpleadoAnom/Login`;
    const body = { Email, Pass };
    return new Observable<User>((observer) => {
      this.http.post<string>(url, body).subscribe(
        (data) => {
          console.log(data);
          if (data == '') {
            console.log(data);
            observer.error({ message: 'Usuario no existe' });
            observer.next();
          } else {
            const usuario = new User();
            usuario.email = Email;
            usuario.id = 'usuarioId';
            localStorage.setItem('token', data);
            observer.next(usuario);
            console.log(usuario);
          }
          observer.complete();
        },
        () => observer.error()
      );
      //   tap((resp) => {
      //     console.log(resp);
      //   }),
      //   map((resp) => resp),
      //   catchError((err) => of(err))
      // );
    });
    // return new Observable<User>((observer) => {
    // setTimeout(() => {
    //   if (Email == 'error@email.com') {
    //     observer.error({ message: 'Usuario no existe' });
    //     observer.next();
    //   } else {
    //     const usuario = new User();
    //     usuario.email = Email;
    //     usuario.id = 'usuarioId';
    //     observer.next(usuario);
    //   }
    //   observer.complete();
    // }, 3000);
    // });
  }
}
