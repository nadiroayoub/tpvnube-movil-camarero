import { Negocio } from './Negocio';

export interface Plato {
  Id: number;
  Nombre: string;
  Stock: number;
  Precio: number;
  Foto: string;
  NegocioPlato: Negocio;
}
