import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../enviorenments/environment';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

    LoggedIn = false;
    constructor(private http: HttpClient) { }
    login(email: string, password: string): Observable<boolean> {
        const url = environment.baseUrl + '/api/login/';
        return this.http.post<any>(url, { email, password }).pipe(
            map(res => {
                if (res && res.token) {
                    localStorage.setItem('token', res.token);
                    this.LoggedIn = true;
                    return true;
                } else {
                    return false;
                }
            }),
            catchError(err => {
                console.error(err);
                return of(false);
            })
        );
    }


    signup(email: string, password: string): boolean {
        // Ideally send to backend
        return true;
    }

    logout() {
        this.LoggedIn = false;
        localStorage.removeItem('token');
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            // Check expiry
            if (Date.now() >= payload.exp * 1000) {
                return false;
            }
            return true;
        } catch (e) {
            return false; // Invalid token format
        }
    }
    isLoggedIn(): boolean {
        return this.LoggedIn;
    }
}
