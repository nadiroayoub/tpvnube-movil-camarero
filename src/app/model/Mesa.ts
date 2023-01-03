export interface Mesa {
  Id: string;
  Estado: Estado;
  Numero: number;
}

export enum Estado {
  disponible = 1,
  ocupado = 2,
  pendientePago = 3,
}
