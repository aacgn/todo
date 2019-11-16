import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskApi {
    
    private readonly API = 'http://localhost:8080/api/v1/task';

    constructor(private http: HttpClient){}

    public getTasks(): Observable<Task[]>{
        return this.http.get<[]>(this.API);
    }

    public createTask(task: Task): Observable<any> {
        return this.http.post(this.API, task);
    }

    public updateTask(task: Task): Observable<any> {
        return this.http.put(`${this.API}/${task.id}`, task);
    }
}