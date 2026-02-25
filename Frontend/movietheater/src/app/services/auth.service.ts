import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root'})
export class AuthService {
    private API = 'http://localhost:3000';

    constructor(private http: HttpClient){}

    getAccessToken(){
        return localStorage.getItem('access_token');
    }
    
    getrefreshToken(){
        return localStorage.getItem('refresh_token');
    }

    setTokens(accessToken: string, refreshToken?: string){
        localStorage.setItem('access_token', accessToken);
        if(refreshToken){
            localStorage.setItem('refresh_token', refreshToken);
        }
    }

    refreshToken(){
        return this.http.post<{ access_token: string }>(
            `${environment.apiUrl}/refresh`,
            { refresh_token: this.getrefreshToken()}
        );
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(): boolean{
        return !!this.getAccessToken();
    }

    getRoleId(): number | null {
        const token = this.getAccessToken();
        if (!token) return null;

        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload.role_id ?? null;
    }
   
}
