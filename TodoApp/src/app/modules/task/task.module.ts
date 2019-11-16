import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskCardListComponent } from './containers/task-card-list/task-card-list.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TaskApi } from './api/task.api';
import { TaskFacade } from './task.facade';
import { TaskState } from './state/taks.state';
import { TaskListkGuard } from './guards/task-list.guard';
import { JwtInterceptor } from 'src/app/core/auth/interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    TaskCardListComponent,
    TaskCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TaskRoutingModule
  ],
  providers: [
    TaskApi,
    TaskFacade,
    TaskState,
    TaskListkGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class TaskModule { }
