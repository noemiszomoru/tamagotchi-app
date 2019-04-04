import { Injectable } from '@angular/core';

import { Group } from '../models/group.model';
import { Child } from '../models/child.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient) { }

    getGroups(): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/groups');
    }

    getChildren(groupId: number = 0): Observable<Object> {
        if (groupId) {
            return this.httpClient.get('http://localhost:8080/children/' + groupId);
        } else {
            return this.httpClient.get('http://localhost:8080/children');
        }
    }

    getFoodSleepList(groupId: number = 0): Observable<Object> {
        if (groupId) {
            return this.httpClient.get('http://localhost:8080/food-sleep/' + groupId);
        } else {
            return this.httpClient.get('http://localhost:8080/food-sleep');
        }
    }

    getUsers(): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/users');
    }

}