import { Factura } from './Factura';
import { LineaComanda } from './LineaComanda';
import { Mesa } from './Mesa';

export interface Comanda {
  Id: number;
  Fecha: string;
  EstadoComanda: EstadoComanda;
  Total: number;
  Lineas: LineaComanda[];
  Factura: Factura;
  MesaOfComanda: Mesa;
  AllLineaComandaOfComanda: LineaComanda[];
}
export interface PostComanda {
  EstadoComanda: EstadoComanda;
  Mesa_oid: number;
  Empleado_oid: number;
}
export interface CuentaComanda  {
  Nombre: string;
 Precio: string;
 Foto: string;
Cantidad: number;
}

export enum EstadoComanda {
  comanda = 1,
  preparado = 2,
  rechazado = 3,
}
