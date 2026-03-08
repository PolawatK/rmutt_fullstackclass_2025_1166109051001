import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class ShowtimeService{
    private api = `${environment.apiUrl}/showtimes`

    constructor(private http: HttpClient){}

    createShowtime(data:any):Observable<any>{
        return this.http.post(this.api, data);
    }

    getShowtimeById(id:number):Observable<any>{
        return this.http.get(`${this.api}/${id}`);
    }

    deleteShowtime(id:string){
        return this.http.delete(`${environment.apiUrl}/showtimes/${id}`);
    }

    updateShowtime(id:string,data:any){
        return this.http.put(`${environment.apiUrl}/showtimes/${id}`,data);
    }
}