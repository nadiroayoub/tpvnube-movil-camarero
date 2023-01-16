export interface Factura {
  Id: number;
  Numero: string;
  Fecha: string;
  Precio: number;
  Descripcion: string;
  Comanda_oid: number;
  Cliente_oid: number;
}
