import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  @Input() index$: number;
  @Input() task$: Task;
  @Output() completeTask$ = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  public completeTask(): void {
    this.completeTask$.emit(this.index$);
  }

  public get isTaskComplete(): boolean {
    return this.task$.isComplete;
  }

}
