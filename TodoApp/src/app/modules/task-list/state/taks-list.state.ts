import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskListState {

    private updating$ = new BehaviorSubject<boolean>(false);
    private tasks$ = new BehaviorSubject<Task[]>(null);

    public isUpdating$(): Observable<boolean> {
        return this.updating$.asObservable();
    }

    public setUpdating(isUpdating: boolean): void {
        this.updating$.next(isUpdating);
    }

    public getTasks$(): Observable<Task[]> {
        return this.tasks$;
    }

    public setTasks(tasks: Task[]): void {
        this.tasks$.next(tasks);
    }

    public addTask(task: Task): void {
        const currentValue = this.tasks$.getValue();
        this.tasks$.next([...currentValue, task]);
    }

    public updateTask(updatedTask: Task): void {
        const tasks = this.tasks$.getValue();
        const indexOfUpdated = tasks.findIndex(task => task.id === updatedTask.id);
        tasks[indexOfUpdated] = updatedTask;
        this.tasks$.next([...tasks]);
    }

    public updateTaskId(taskToReplace: Task, addedTaskWithId: Task): void {
        const tasks = this.tasks$.getValue();
        const indexOfUpdated = tasks.findIndex(task => task === taskToReplace);
        tasks[indexOfUpdated] = addedTaskWithId;
        this.tasks$.next([...tasks]);
    }

    public removeTask(taskRemove: Task): void {
        const currentValue = this.tasks$.getValue();
        this.tasks$.next(currentValue.filter(task => task !== taskRemove));
    }

}