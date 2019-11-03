import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskCardListComponent } from './modules/task-list/containers/task-card-list/task-card-list.component';
import { TaskCardComponent } from './modules/task-list/components/task-card/task-card.component';
import { TaskApi } from './modules/task-list/api/task.api';
import { TaskListFacade } from './modules/task-list/task-list.facade';
import { TaskListState } from './modules/task-list/state/taks-list.state';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TaskCardListComponent,
    TaskCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [TaskApi, TaskListFacade, TaskListState],
  bootstrap: [AppComponent]
})
export class AppModule { }
