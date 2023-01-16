import { Cobro } from './Cobro';
import { Factura } from './Factura';
export interface Cliente {
  Id: number;
  Dni: string;
  Nombre: string;
  Apellidos: string;
  Email: string;
  Factura_oid: Factura[];
  Cobro_oid: Cobro[];
  Negocio_oid: number;
}
