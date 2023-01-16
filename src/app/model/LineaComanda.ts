import { Menu } from './Menu';
import { Plato } from './Plato';

export interface LineaComanda {
  Id: number;
  Cantidad: number;
  Platos: Plato;
  Menus: Menu;
}
export interface PostLineaComanda {
  Comanda_oid: number;
  Cantidad: number;
  Menu_oid: number;
  Plato_oid: number;
}
// export interface CuentaLineaComanda {
//   Id: number;
//   Cantidad: number;
//   PlatoOfLineaComanda: Plato;
//   MenuOfLineaComanda: Menu;
// }
