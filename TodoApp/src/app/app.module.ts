import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthFacade } from './core/auth/auth.facade';
import { AuthApi } from './core/auth/api/auth.api';
import { AuthState } from './core/auth/state/auth.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    AuthFacade,
    AuthApi,
    AuthState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
