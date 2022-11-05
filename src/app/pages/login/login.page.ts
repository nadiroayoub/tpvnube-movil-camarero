import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';
import { LoginPageForm } from './login.page.form';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/AppState';
import { hide, show } from 'src/app/store/loading/loading.actions';
import {
  login,
  recoverPassword,
  recoverPasswordSuccess,
} from '../../store/login/login.actions';
import { LoginState } from '../../store/login/LoginState';
import {
  recoverPasswordFail,
  loginSuccess,
} from '../../store/login/login.actions';
import { Subscription } from 'rxjs';
import { loginFail } from '../../store/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  loginFormulario: FormGroup;
  loginStateSubscription: Subscription;
  constructor(
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private store: Store<AppState>,
    private toastController: ToastController
  ) {
    this.menu.close();
  }
  ngOnDestroy(): void {
    if (this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loginFormulario = new LoginPageForm(this.formBuilder).createForm();
    this.loginStateSubscription = this.store
      .select('login')
      .subscribe((loginState) => {
        this.onIsRecoveredPassword(loginState);
        this.onIsRecoveringPassword(loginState);

        this.onIsLoggingIn(loginState);
        this.onIsLoggedIn(loginState);

        this.onError(loginState);
        this.toggleLoading(loginState);
      });
  }
  private toggleLoading(loginState: LoginState) {
    if (loginState.isLoggingIn || loginState.isRecoveringPassword) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }
  private onIsLoggedIn(loginState: LoginState) {
    if (loginState.isLoggedIn) {
      this.router.navigate(['home']);
    }
  }
  private onIsLoggingIn(loginState: LoginState) {
    if (loginState.isLoggingIn) {
      const email = this.loginFormulario.get('email').value;
      const password = this.loginFormulario.get('password').value;
      this.authService.login(email, password).subscribe(
        (user) => {
          this.store.dispatch(loginSuccess({ user }));
        },
        (error) => {
          this.store.dispatch(loginFail({ error }));
        }
      );
    }
  }
  private async onError(loginState: LoginState) {
    if (loginState.error) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: loginState.error.message,
        color: 'danger',
        duration: 3000
      });
      toaster.present();
    }
  }
  private onIsRecoveringPassword(loginState: LoginState) {
    if (loginState.isRecoveringPassword) {
      this.authService
        .recoverEmailPassword(this.loginFormulario.get('email').value)
        .subscribe(
          () => {
            this.store.dispatch(recoverPasswordSuccess());
          },
          (error) => this.store.dispatch(recoverPasswordFail({ error }))
        );
    }
  }
  private async onIsRecoveredPassword(loginState: LoginState) {
    if (loginState.isRecoveredPassword) {
      const toaster = await this.toastController.create({
        position: 'bottom',
        message: 'correo electrónico de recuperación enviado',
        color: 'primary',
      });
      toaster.present();
    }
  }
  login() {
    // const { email, password } = this.loginFormulario.value;
    // this.authService.login(email, password).subscribe((token) => {
    //   console.log(token);
    //   if (typeof token !== 'object') {
    //     this.router.navigateByUrl('/dashboard');
    //   } else {
    //     Swal.fire('Error', token, 'error');
    //   }
    // });
    this.store.dispatch(login());
  }

  forgetEmailPassword() {
    // this.store.dispatch(show());
    // setTimeout(() => {
    //   this.store.dispatch(hide());
    // }, 3000);
    this.store.dispatch(recoverPassword());
  }
}
