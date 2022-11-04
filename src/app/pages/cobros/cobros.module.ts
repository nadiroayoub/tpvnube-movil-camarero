import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { IonicModule } from '@ionic/angular';

import { CobrosPageRoutingModule } from './cobros-routing.module';

import { CobrosPage } from './cobros.page';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobrosPageRoutingModule,
    NgxDatatableModule,
    FormsModule,
    HttpClientModule,
    MaterialModule
  ],
  declarations: [CobrosPage],
})
export class CobrosPageModule {}
