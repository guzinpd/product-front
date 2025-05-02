// src/app/core/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap, catchError, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface LoginRequest  { username: string; password: string; }
export interface LoginResponse { token: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
    private baseUrl = `${environment.apiUrl}/auth`;

    // 1) BehaviorSubject com valor inicial baseado em localStorage
    private authStateSubject = new BehaviorSubject<boolean>(!!this.getToken());
    public authState$  = this.authStateSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(creds: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.baseUrl}/login`, creds).pipe(
        tap(res => {
            localStorage.setItem('jwt_token', res.token);
            this.authStateSubject.next(true);     // sinaliza “logado”
        }),
        catchError(err => this.handleError(err))
        );
    }

    logout(): void {
        localStorage.removeItem('jwt_token');
        this.authStateSubject.next(false);        // sinaliza “deslogado”
    }

    getToken(): string | null {
        return localStorage.getItem('jwt_token');
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error.status === 400) {
        return throwError(() => new Error('Usuário ou senha inválidos.'));
        }
        return throwError(() => new Error('Erro no servidor. Tente mais tarde.'));
    }
}
