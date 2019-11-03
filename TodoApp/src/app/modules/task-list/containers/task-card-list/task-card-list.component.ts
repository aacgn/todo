import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { Observable } from 'rxjs';
import { TaskListFacade } from '../../task-list.facade';

@Component({
  selector: 'app-task-card-list',
  templateUrl: './task-card-list.component.html',
  styleUrls: ['./task-card-list.component.css']
})
export class TaskCardListComponent implements OnInit {

  public tasks$: Task[];
  public isUpdating$: Observable<boolean>;

  constructor(private taskListFacade: TaskListFacade) {
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

  public completeTask(index: string): void {
    const task = JSON.parse(JSON.stringify(this.tasks$[+index]));
    task.isComplete = true;
    this.taskListFacade.updateTask(task);
  }

}
