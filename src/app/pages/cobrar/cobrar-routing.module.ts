import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobrarPage } from './cobrar.page';

const routes: Routes = [
  {
    path: '',
    component: CobrarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CobrarPageRoutingModule {}
