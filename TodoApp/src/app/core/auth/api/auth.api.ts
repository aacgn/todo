import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthApi {

    private readonly BASE_API = 'http://localhost:8080/api/v1';

    constructor(private http: HttpClient){}

    public login(userName: string, password: string): Observable<any> {
        const endpoint = 'login';
        return this.http.post(`${this.BASE_API}/${endpoint}`, {userName, password});
    }

    public logout(refreshToken: string): Observable<any> {
        const endpoint = 'logout';
        return this.http.post(`${this.BASE_API}/${endpoint}`, {refreshToken});
    }

    public refreshToken(refreshToken: string): Observable<any> {
        const endpoint = 'refresh';
        return this.http.post(`${this.BASE_API}/${endpoint}`, {refreshToken});
    }
}