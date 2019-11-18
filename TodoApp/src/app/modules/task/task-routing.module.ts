import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListkGuard } from './guards/task-list.guard';
import { TaskListComponent } from './containers/task-list/task-list.component';
import { AddTaskComponent } from './containers/add-task/add-task.component';
import { AddTaskGuard } from './guards/add-task.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list'
  },
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [TaskListkGuard]
  },
  {
    path: 'add-task',
    component: AddTaskComponent,
    canActivate: [AddTaskGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
