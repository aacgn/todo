import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './containers/login/login.component';
import { AuthApi } from './api/auth.api';
import { AuthFacade } from './auth.facade';
import { AuthState } from './state/auth.state';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  providers: [
    AuthGuard
  ]
})
export class AuthModule { }
