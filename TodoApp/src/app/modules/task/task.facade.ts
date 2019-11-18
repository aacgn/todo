import { Injectable } from "@angular/core";
import { TaskApi } from './api/task.api';
import { TaskState } from './state/taks.state';
import { Observable } from 'rxjs';
import { Task } from './models/task.model';

@Injectable()
export class TaskFacade {

    constructor(private taskApi: TaskApi, private taskListState: TaskState){}

    public isUpdating$(): Observable<boolean> {
        return this.taskListState.isUpdating$();
    }

    public getTasks$(): Observable<Task[]> {
        // here we just pass the state without any projections
        // it may happen that it is necessary to combine two or more streams and expose to the components
        return this.taskListState.getTasks$();
    }

    public loadTasks(): Observable<Task[]> {
        const tasks$ = this.taskApi.getTasks();
        tasks$.subscribe(
            (tasks$: Task[]) => {
                this.taskListState.setTasks(tasks$);
            }
        );
        return tasks$;
    }

    public addTask(task: Task): void {
        this.taskListState.setUpdating(true);
        this.taskApi.createTask(task)
            .subscribe(
                () => this.taskListState.addTask(task),
                (error) => console.log(error),
                () => this.taskListState.setUpdating(false)
            );
    }

    public updateTask(task: Task): void {
        this.taskListState.setUpdating(true);
        this.taskApi.updateTask(task)
            .subscribe(
                () => this.taskListState.updateTask(task),
                (error) => console.log(error),
                () => this.taskListState.setUpdating(false)
            );
    }

}