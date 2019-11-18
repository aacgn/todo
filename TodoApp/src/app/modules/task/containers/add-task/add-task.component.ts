import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskFacade } from '../../task.facade';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  taskForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(private taskFacade: TaskFacade,private router: Router) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask = new Task(null, 1, this.taskForm.value.title, this.taskForm.value.description, null);
      this.taskFacade.addTask(newTask);
      this.redirectToTaskList();
    }
  }

  public redirectToTaskList(): void {
    this.router.navigate(['/task/task-list']);
  }
}
