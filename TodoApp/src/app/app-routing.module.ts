import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', 
    redirectTo: '/task/task-list',
    pathMatch: 'full'
  },
  {
    path: 'task',
    loadChildren: () => import(`./modules/task/task.module`).then(m => m.TaskModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
