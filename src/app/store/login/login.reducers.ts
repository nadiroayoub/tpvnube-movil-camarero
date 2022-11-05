import { LoginState } from './LoginState';
import { createReducer, on } from '@ngrx/store';
import { AppInitialState } from '../AppInitialState';
import { loginFail } from './login.actions';
import {
  recoverPassword,
  recoverPasswordSuccess,
  recoverPasswordFail,
  login,
  loginSuccess,
} from './login.actions';
const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(
  initialState,
  on(recoverPassword, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true,
    };
  }),
  on(recoverPasswordSuccess, (currentState) => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false,
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false,
    };
  }),
  on(login, (currentState) => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true,
    };
  }),
  on(loginSuccess, (currentState) => {
    return {
      ...currentState,
      isLoggedIn: true,
      isLoggingIn: false,
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false,
    };
  })
);

export function loginReducer(state: LoginState, action) {
  return reducer(state, action);
}
