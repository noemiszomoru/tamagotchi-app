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
import { Config } from 'src/Config';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })

}

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient) { }

    getGroups(): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/groups');
    }

    getGroup(id: number): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/group/' + id);
    }

    getChildren(groupId: number = 0): Observable<Object> {
        if (groupId) {
            return this.httpClient.get(Config.serverUrl + '/children/' + groupId);
        } else {
            return this.httpClient.get(Config.serverUrl + '/children');
        }
    }

    // getFoodSleepList(groupId: number = 0): Observable<Object> {
    //     if (groupId) {
    //         return this.httpClient.get(Config.serverUrl + '/food-sleep/' + groupId);
    //     } else {
    //         return this.httpClient.get(Config.serverUrl + '/food-sleep');
    //     }
    // }

    getChild(id: number): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/child/' + id);
    }

    getChildParent(childId: number): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/child-parent/' + childId);
    }

    getFoodSleepList(date_param: string): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/food-sleep/' + date_param);
    }

    getUsers(): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/users');
    }

    getUser(id: number): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/user/' + id);
    }

    getUserByUsername(username: string): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/user/' + username);
    }

    getUserRoles(): Observable<Object> {
        return this.httpClient.get(Config.serverUrl + '/user-roles');
    }

    saveChild(child: ChildWrapper): Observable<ChildWrapper> {
        return this.httpClient.post<ChildWrapper>(Config.serverUrl + '/child', child, httpOptions)
    }

    deleteChild(id: number): Observable<Object> {
        return this.httpClient.delete(Config.serverUrl + '/children/' + id)
    }

    saveGroup(group: Group): Observable<Group> {
        return this.httpClient.post<Group>(Config.serverUrl + '/group', group, httpOptions)

    }

    deleteGroup(id: number): Observable<Object> {
        return this.httpClient.delete(Config.serverUrl + '/groups/' + id)
    }

    saveUser(user: User): Observable<User> {
        return this.httpClient.post<User>(Config.serverUrl + '/sendEmail', user, httpOptions)

    }

    updateUser(user: User): Observable<User> {
        return this.httpClient.put<User>(Config.serverUrl + '/user', user, httpOptions)

    }

    deleteUser(id: number): Observable<Object> {
        return this.httpClient.delete(Config.serverUrl + '/users/' + id)
    }

    addFoodData(food_entry: FoodEntry): Observable<FoodSleep> {
        return this.httpClient.post<FoodSleep>(Config.serverUrl + '/food', food_entry, httpOptions)
    }

    addSleepData(sleep_entry: SleepEntry): Observable<FoodSleep> {
        return this.httpClient.post<FoodSleep>(Config.serverUrl + '/sleep', sleep_entry, httpOptions)
    }

}