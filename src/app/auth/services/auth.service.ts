import { HttpClient } from '@angular/common/http';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Token } from '../../models/token';

import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private readonly JWT_TOKEN = 'JWT_TOKEN';
    public readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
    private loggedUser: string;
    private userId: number;

    constructor(private http: HttpClient) { }

    register(user: { "name": string, "role": string, "email": string, "username": string, "password": string }): Observable<boolean> {
        console.log(user);
        return this.http.post<any>('http://localhost:8080/register', user)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));

    }

    setPassword(password: string): Observable<boolean> {
        return this.http.post<any>('http://localhost:8080/setPassword/', {
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
        return this.http.post<any>('http://localhost:8080/login', user)
            .pipe(
                tap(tokens => this.doLoginUser(user.username, tokens)),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));

    }

    logout(refreshToken): Observable<Object> {
        refreshToken = this.getRefreshToken()
        return this.http.delete<any>('http://localhost:8080/logout', refreshToken)
            .pipe(
                tap(() => this.doLogoutUser()),
                mapTo(true),
                catchError(error => {
                    alert(JSON.stringify(error));
                    return of(false);
                }));
    }

    isLoggedIn() {
        return !!this.getJwtToken();
    }

    doRefreshToken() {
        return this.http.post<any>('http://localhost:8080/refresh', {
            'refreshToken': this.getJwtToken()
        }).pipe(tap((tokens: Token) => {
            this.storeJwtToken(tokens.accessToken);
        }));
    }

    getJwtToken() {
        const token = localStorage.getItem(this.JWT_TOKEN);
        if (token) {
            const tokenPayload = jwt_decode(token);
            this.userId = tokenPayload.id;
        }
        return token;
    }

    private doLoginUser(username: string, tokens: Token) {
        this.loggedUser = username;
        this.storeToken(tokens);
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