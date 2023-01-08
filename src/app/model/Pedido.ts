import { Factura } from './Factura';
import { Linea } from './Linea';
import { Mesa } from './Mesa';

export interface Pedido {
  Id: number;
  Fecha: string;
  EstadoPedido: EstadoPedido;
  Total: number;
  Lineas: Linea[];
  Factura: Factura;
  MesaComanda: Mesa;
}

export enum EstadoPedido {
  comanda = 1,
  preparado = 2,
  rechazado = 3,
}
