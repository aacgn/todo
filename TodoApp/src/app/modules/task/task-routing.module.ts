import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskCardListComponent } from './containers/task-card-list/task-card-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'task-list'
  },
  {
    path: 'task-list',
    component: TaskCardListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
