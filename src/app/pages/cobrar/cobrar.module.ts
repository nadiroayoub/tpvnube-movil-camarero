import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CobrarPageRoutingModule } from './cobrar-routing.module';

import { CobrarPage } from './cobrar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CobrarPageRoutingModule
  ],
  declarations: [CobrarPage]
})
export class CobrarPageModule {}
