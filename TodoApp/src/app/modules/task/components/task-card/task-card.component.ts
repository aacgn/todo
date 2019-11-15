import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() task$: Task;
  @Output() completeTask$ = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  public completeTask(task: Task): void {
    this.completeTask$.emit(task);
  }

  public get isTaskComplete(): boolean {
    return this.task$.isComplete;
  }

}
