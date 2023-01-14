import { Factura } from './Factura';
import { LineaComanda } from './LineaComanda';
import { Mesa } from './Mesa';

export interface Comanda {
  Id: number;
  Fecha: string;
  EstadoPedido: EstadoComanda;
  Total: number;
  Lineas: LineaComanda[];
  Factura: Factura;
  MesaComanda: Mesa;
}
export interface PostComanda {
  EstadoComanda: EstadoComanda;
  Mesa_oid: number;
  Empleado_oid: number;
}

export enum EstadoComanda {
  comanda = 1,
  preparado = 2,
  rechazado = 3,
}
