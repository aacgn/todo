import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskApi {
    
    readonly API = 'api/v1/tasks';

    private tasksMock = [
        new Task(1,1, 'Fazer PoC', 'Preciso construir uma PoC com uma arquitetura de desenvolvimento angular em 3 camadas', false),
        new Task(2,1, 'Dormir', 'Lembrar de ir dormir de 00:00 para ter pelo menos 6 horas de sono.', true),
        new Task(3,1, 'Preciso dormir pqp', 'Mermão vá dormir ja são 01:00.', true),
    ];

    constructor(private http: HttpClient){}

    public getTasks(): Observable<Task[]>{
        //return this.http.get<[]>(this.API);
        return new BehaviorSubject<Task[]>(this.tasksMock).asObservable();
    }

    public updateTask(task: Task): Observable<any> {
        //return this.http.put(`${this.API}/${task.id}`, task);
        this.tasksMock.map(
            (taskMock) => {
                if (taskMock.id == task.id) {
                    taskMock = task;
                }
            }
        );
        return new BehaviorSubject<Task[]>(this.tasksMock).asObservable();
    }

    public createTask(task: Task): Observable<any> {
        return this.http.post(this.API, task);
    }
}