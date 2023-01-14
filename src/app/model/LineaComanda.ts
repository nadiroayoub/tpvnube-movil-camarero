import { Menu } from './Menu';
import { Plato } from './Plato';

export interface LineaComanda {
  Id: number;
  Cantidad: number;
  Platos: Plato;
  Menus: Menu;
}
export interface PostLineaComanda {
  Id: number;
  Cantidad: number;
  Menu_oid: number;
  Plato_oid: number;
}
