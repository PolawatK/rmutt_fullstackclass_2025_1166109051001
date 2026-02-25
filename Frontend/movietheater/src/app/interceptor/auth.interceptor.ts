import {
    HttpEvent,
    HttpInterceptor,
    HttpRequest,
    HttpErrorResponse,
    HttpHandler
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError  } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null > (null);

    constructor(private auth: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler ){
        const token = this.auth.getAccessToken();

        let authReq = req;
        if (token) {
            authReq = this.addToken(req, token);
        }

        return next.handle(authReq).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401){
                    return this.handle401Error(authReq, next);
                }
                return throwError(() => error);
            })
        );
    }

    private addToken(req: HttpRequest<any>, token: string){
        return req.clone({
            setHeaders:{
                Authorization: `Bearer ${token}`
            }
        });
    }

    private handle401Error(req: HttpRequest<any>, next: HttpHandler){
        if(!this.isRefreshing){
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.auth.refreshToken().pipe(
                switchMap(res => {
                    this.isRefreshing = false;
                    this.auth.setTokens(res.access_token);
                    this.refreshTokenSubject.next(res.access_token);
                    return next.handle(this.addToken(req, res.access_token));
                }),
                catchError(err => {
                    this.isRefreshing = false;
                    this.auth.logout();
                    return throwError(() => err)
                })
            );
        }

        return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token => next.handle(this.addToken(req, token!)))
        )
    }
}  
