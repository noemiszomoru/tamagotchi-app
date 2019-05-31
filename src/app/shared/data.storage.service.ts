import { Injectable } from '@angular/core';

import { Group } from '../models/group.model';
import { Child } from '../models/child.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ChildWrapper } from '../models/child.wrapper.model';
import { FoodSleep } from '../models/food-sleep.model';
import { FoodEntry } from '../models/food-entry.model';
import { User } from '../models/user.model';
import { SleepEntry } from '../models/sleep-entry.model';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })

}

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient) { }

    getGroups(): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/groups');
    }

    getGroup(id: number): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/group/' + id);
    }

    getChildren(groupId: number = 0): Observable<Object> {
        if (groupId) {
            return this.httpClient.get('http://localhost:8080/children/' + groupId);
        } else {
            return this.httpClient.get('http://localhost:8080/children');
        }
    }

    // getFoodSleepList(groupId: number = 0): Observable<Object> {
    //     if (groupId) {
    //         return this.httpClient.get('http://localhost:8080/food-sleep/' + groupId);
    //     } else {
    //         return this.httpClient.get('http://localhost:8080/food-sleep');
    //     }
    // }

    getChild(id: number): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/child/' + id);
    }

    getChildParent(childId: number): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/child-parent/' + childId);
    }

    getFoodSleepList(date_param: string): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/food-sleep/' + date_param);
    }

    getUsers(): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/users');
    }

    getUser(id: number): Observable<Object> {
        return this.httpClient.get('http://localhost:8080/user/' + id);
    }

    saveChild(child: ChildWrapper): Observable<ChildWrapper> {
        return this.httpClient.post<ChildWrapper>('http://localhost:8080/child', child, httpOptions)

    }

    deleteChild(id: number): Observable<Object> {
        return this.httpClient.delete('http://localhost:8080/children/' + id)
    }

    saveGroup(group: Group): Observable<Group> {
        return this.httpClient.post<Group>('http://localhost:8080/group', group, httpOptions)

    }

    deleteGroup(id: number): Observable<Object> {
        return this.httpClient.delete('http://localhost:8080/groups/' + id)
    }

    saveUser(user: User): Observable<User> {
        return this.httpClient.post<User>('http://localhost:8080/sendEmail', user, httpOptions)

    }

    deleteUser(id: number): Observable<Object> {
        return this.httpClient.delete('http://localhost:8080/users/' + id)
    }

    addFoodData(food_entry: FoodEntry): Observable<FoodSleep> {
        return this.httpClient.post<FoodSleep>('http://localhost:8080/food', food_entry, httpOptions)
    }

    addSleepData(sleep_entry: SleepEntry): Observable<FoodSleep> {
        return this.httpClient.post<FoodSleep>('http://localhost:8080/sleep', sleep_entry, httpOptions)
    }

}