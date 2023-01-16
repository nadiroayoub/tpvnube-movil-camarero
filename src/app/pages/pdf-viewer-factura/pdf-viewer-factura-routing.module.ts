import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PdfViewerFacturaPage } from './pdf-viewer-factura.page';

const routes: Routes = [
  {
    path: '',
    component: PdfViewerFacturaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PdfViewerFacturaPageRoutingModule {}
