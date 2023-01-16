export interface Cobro {
  Id: number;
  Monto: number;
  TipoDeCobro: string;
  NumeroTransaccion: string;
  Fecha: string;
}

export interface PostCobro {
  Id: number;
  Monto: number;
  Comanda_oid: number;
  Cliente_oid: number;
  TipoDeCobro: string;
  TipoCobro_oid: number;
  Caja_oid: number;
  NumeroTransaccion: string;
  Empleado_oid: number;
  Negocio_oid: number;
}
