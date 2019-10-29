import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Token } from '../../models/token';

import * as jwt_decode from "jwt-decode";
import { User } from 'src/app/models/user.model';
import { DataStorageService } from 'src/app/shared/data.storage.service';
import { Router } from '@angular/router';
import { Config } from 'src/Config';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string;
    private _userId: number;
    private _userRole: string;
    private _userName: string;
    // private user: User;

    constructor(private http: HttpClient, private dataStorageService: DataStorageService, private router: Router) { }

    public get userId() {
        return this._userId;
    }

    public get userName() {
        return this._userName;
    }

    public get userRole() {
        return this._userRole;
    }

    register(user: { "name": string, "role": string, "email": string, "username": string, "password": string }): Observable<boolean> {
        console.log(user);
        return this.http.post<any>(Config.serverUrl + '/register', user)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));

    }

    setPassword(password: string): Observable<boolean> {
        return this.http.post<any>(Config.serverUrl + '/setPassword/', {
            id: this.userId,
            password: password
        })
            .pipe(
                tap(result => {
                    console.log(`Set password post result: `, result);
                }),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));

    }

    login(user: { "username": string, "password": string }): Observable<boolean> {
        console.log(user);
        return this.http.post<any>(Config.serverUrl + '/login', user)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    if (error.error) {
                        alert(error.error);
                    } else {
                        alert(JSON.stringify(error));
                    }
                    return of(false);
                }));


    }

    logout(refreshToken): Observable<Object> {
        refreshToken = this.getRefreshToken();
        this.doLogoutUser();

        return this.http.delete<any>(Config.serverUrl + '/logout', refreshToken)
            .pipe(
                tap(() => { }),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    // isParent() {
    //     this.dataStorageService.getUserByUsername(this.loggedUser).subscribe((user: User) => {
    //         this.user = user;
    //     });
    //     if (this.user.role === 'parent') {
    //         return !!this.isParent();
    //     }
    // }

    // userParent() {

    // }

    // isTeacher() {
    //     this.dataStorageService.getUserByUsername(this.loggedUser).subscribe((user: User) => {
    //         this.user = user;
    //     });
    //     if (this.user.role === 'teacher') {
    //         return !!this.isTeacher();
    //     }
    // }

    doRefreshToken() {
        return this.http.post<any>(Config.serverUrl + '/refresh', {
            'refreshToken': this.getJwtToken()
        }).pipe(tap((tokens: Token) => {
            this.storeJwtToken(tokens.accessToken);
        }));
    }

    getJwtToken() {
        const token = localStorage.getItem(this.JWT_TOKEN);
        if (token) {
            const tokenPayload = jwt_decode(token);
            this._userId = tokenPayload.id;
            this._userName = tokenPayload.name;
            this._userRole = tokenPayload.role;
        }
        return token;
    }

    private doLoginUser(username: string, tokens: Token) {
        this.loggedUser = username;
        this.storeToken(tokens);
        this.getJwtToken();
    }

    private doLogoutUser() {
        this.loggedUser = null;
        this.removeToken();
        console.log('logout?');
    }

    private getRefreshToken() {
        return localStorage.getItem(this.REFRESH_TOKEN);
    }

    private storeJwtToken(accessToken: string) {
        localStorage.setItem(this.JWT_TOKEN, accessToken);
    }

    private storeToken(token: Token) {
        localStorage.setItem(this.JWT_TOKEN, token.accessToken);
        localStorage.setItem(this.REFRESH_TOKEN, token.refreshToken);
    }

    private removeToken() {
        localStorage.removeItem(this.JWT_TOKEN);
        localStorage.removeItem(this.REFRESH_TOKEN);

    }

}