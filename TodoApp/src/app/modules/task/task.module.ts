import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { TaskRoutingModule } from './task-routing.module';
import { TaskApi } from './api/task.api';
import { TaskFacade } from './task.facade';
import { TaskState } from './state/taks.state';
import { TaskListkGuard } from './guards/task-list.guard';
import { JwtInterceptor } from 'src/app/core/auth/interceptors/jwt.interceptor';
import { AddTaskComponent } from './containers/add-task/add-task.component';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { TaskCardComponent } from './components/task-card/task-card.component';


@NgModule({
  declarations: [
    TaskCardComponent,
    AddTaskComponent,
    TaskListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
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
