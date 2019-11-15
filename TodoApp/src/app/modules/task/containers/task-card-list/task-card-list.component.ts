import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { TaskFacade } from '../../task.facade';

@Component({
  selector: 'app-task-card-list',
  templateUrl: './task-card-list.component.html',
  styleUrls: ['./task-card-list.component.css']
})
export class TaskCardListComponent implements OnInit {

  public tasks$: Task[];
  public isUpdating$: Observable<boolean>;

  constructor(private taskListFacade: TaskFacade) {
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

  public completeTask(task: Task): void {
    task.isComplete = true;
    this.taskListFacade.updateTask(task);
  }

}
