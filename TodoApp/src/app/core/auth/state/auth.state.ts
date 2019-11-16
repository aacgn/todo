import { Injectable } from '@angular/core';
import { JWT } from '../models/jwt.model';;
import { User } from '../models/user.model';

@Injectable()
export class AuthState {

    private readonly LOCAL_STORAGE_ITEM_JWT_TOKEN = 'JWT_TOKEN';
    private readonly LOCAL_STORAGE_ITEM_JWT_REFRESH_TOKEN = 'JWT_REFRESH_TOKEN';
    private readonly LOCAL_STORAGE_ITEM_LOGGED_USER = 'LOGGED_USER';

    public getLoggedUser(): User {
        return Object.assign(new User(), JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_ITEM_LOGGED_USER)));
    }

    public getJwtToken(): string {
        return localStorage.getItem(this.LOCAL_STORAGE_ITEM_JWT_TOKEN);
    }

    public getJwtRefreshToken(): string {
        return localStorage.getItem(this.LOCAL_STORAGE_ITEM_JWT_REFRESH_TOKEN);
    }

    public removeJWT(): void {
        localStorage.removeItem(this.LOCAL_STORAGE_ITEM_JWT_TOKEN);
        localStorage.removeItem(this.LOCAL_STORAGE_ITEM_JWT_REFRESH_TOKEN);
    }

    public setJWT(JWT: JWT): void {
        localStorage.setItem(this.LOCAL_STORAGE_ITEM_JWT_TOKEN, JWT.token);
        localStorage.setItem(this.LOCAL_STORAGE_ITEM_JWT_REFRESH_TOKEN, JWT.refreshToken); 
    }

    public setLoggedUser(user: User): void {
        localStorage.setItem(this.LOCAL_STORAGE_ITEM_LOGGED_USER, JSON.stringify(user));
    }

    public removeLoggedUser(): void {
        localStorage.removeItem(this.LOCAL_STORAGE_ITEM_LOGGED_USER);
    }

}