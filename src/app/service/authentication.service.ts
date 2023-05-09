import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';
import { apiUrls } from '../utils/api-urls';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User | null> | null;
    public currentUser: Observable<User | null>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        const initialUser = storedUser ? JSON.parse(storedUser) : null;
        this.currentUserSubject = new BehaviorSubject<User | null>(initialUser);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    
    public get currentUserValue(): User | null {
        return this.currentUserSubject!.value;
      }
      

    register(user: User) {
        return this.http.post(apiUrls.register, user);
    }

    login(username: string, password: string) {
        return this.http.post<any>(apiUrls.login, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject!.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject!.next(null);
    }
}