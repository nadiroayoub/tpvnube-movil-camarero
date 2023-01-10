import { Negocio } from './Negocio';

export interface Menu {
  Id: number;
  Nombre: string;
  Foto: string;
  Precio: number;
  Stock: number;
  NegocioMenu: Negocio;
}
