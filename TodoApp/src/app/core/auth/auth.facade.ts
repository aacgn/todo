import { Injectable } from "@angular/core";
import { AuthApi } from './api/auth.api';
import { AuthState } from './state/auth.state';
import { User } from './models/user.model';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable()
export class AuthFacade {
    
    constructor(private authApi: AuthApi, private authState: AuthState){}

    public getLoggedUser(): User {
        return this.authState.getLoggedUser();
    }

    public getJwtToken(): string {
        return this.authState.getJwtToken();
    }

    public getJwtRefreshToken(): string {
        return this.authState.getJwtRefreshToken();
    }

    public login(userName: string, password: string): Observable<boolean> {
        return this.authApi.login(userName, password).pipe(
            tap(
                (response)=> {
                    this.authState.setJWT(response.JWT);
                    this.authState.setLoggedUser(response.loggedUser);
                }
            ),
            mapTo(true),
            catchError(
                (error) => {
                    console.log(error);
                    return of(false);
                }
            ));
    }

    public logout(refreshToken: string): Observable<boolean> {
        return this.authApi.logout(refreshToken).pipe(
            tap(
                (response)=> {
                    this.authState.removeJWT();
                    this.authState.removeLoggedUser();
                }
            ),
            mapTo(true),
            catchError(
                (error) => {
                    console.log(error);
                    return of(false);
                }
            ));
    }

    public refreshToken(refreshToken: string): Observable<boolean> {
        return this.authApi.refreshToken(refreshToken).pipe(
            tap(
                (response)=> {
                    this.authState.setJWT(response.JWT);
                }
            ),
            mapTo(true),
            catchError(
                (error) => {
                    console.log(error);
                    return of(false);
                }
            ));
    }

}