export interface Factura {
  Id: number;
  Numero: string;
  Fecha: Date;
  Precio: number;
  Descripcion: string;
  Comanda_oid: number;
  Cliente_oid: number;
}
