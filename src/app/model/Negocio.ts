import { Mesa } from './Mesa';

export interface Negocio {
  Id: string;
  Nombre: string;
  Direccion: string;
  Ciudad: string;
  Cp: string;
  Provincia: string;
  Pais: string;
  Mesas: Mesa[];
}
