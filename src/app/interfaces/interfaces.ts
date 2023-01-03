import { Negocio } from "../model/Negocio";

export interface AuthResponse {
  Id: string;
  Nombre: string;
  Apellidos: string;
  Telefono: string;
  Email: string;
  Dni: string;
  Pass: string;
  Foto: string;
  Negocio: Negocio;
}
export interface Usuario {
  uid: string;
  name: string;
  email: string;
}
