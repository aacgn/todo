import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { TaskFacade } from '../../task.facade';
import { Router } from '@angular/router';
import { AuthFacade } from 'src/app/core/auth/auth.facade';
import { UserRole } from 'src/app/core/auth/enums/user-role.enum';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks$: Task[]; 
  public isUpdating$: Observable<boolean>;

  constructor(private authFacade: AuthFacade, private taskListFacade: TaskFacade, private router: Router) {
    this.isUpdating$ = this.taskListFacade.isUpdating$();
  }

  ngOnInit() {
    this.taskListFacade.loadTasks();
    this.taskListFacade.getTasks$()
      .subscribe(
        (response) => {
          this.tasks$ = response;
        }
    );
  }

  public get isLoggedUserAdministrator(): boolean {
    return this.authFacade.getLoggedUser().role === UserRole.ADMINISTRATOR;
  }

  public completeTask(task: Task): void {
    task.isComplete = true;
    this.taskListFacade.updateTask(task);
  }

  public redirectToAddTask(): void {
    this.router.navigate(['/task/add-task']);
  }

}
