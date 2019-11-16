import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCardListComponent } from './containers/task-card-list/task-card-list.component';
import { TaskListkGuard } from './guards/task-list.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list'
  },
  {
    path: 'task-list',
    component: TaskCardListComponent,
    canActivate: [TaskListkGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
