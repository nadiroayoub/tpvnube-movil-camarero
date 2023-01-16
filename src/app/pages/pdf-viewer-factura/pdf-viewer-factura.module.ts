import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PdfViewerFacturaPageRoutingModule } from './pdf-viewer-factura-routing.module';

import { PdfViewerFacturaPage } from './pdf-viewer-factura.page';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PdfViewerFacturaPageRoutingModule,
    PdfViewerModule
  ],
  declarations: [PdfViewerFacturaPage]
})
export class PdfViewerFacturaPageModule {}
