import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppStoreModule } from './store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingComponent } from './components/loading/loading.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
