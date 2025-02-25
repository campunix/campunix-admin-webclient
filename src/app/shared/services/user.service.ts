import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {User} from 'app/models/user';
import {Response} from "app/models/response";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<Response<User[]>> {
        let params = new HttpParams().set('paginate', 'false');
        return this.http.get<Response<User[]>>(this.baseUrl, { params });
    }
}
