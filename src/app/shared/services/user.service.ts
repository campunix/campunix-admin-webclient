import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'environments/environment';
import {User} from 'app/models/user';
import {ListResponse, Response} from "app/models/response";
import {Department} from "../../models/department";

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseUrl = `${environment.apiUrl}/users`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<Response<ListResponse<User>>> {
        let params = new HttpParams().set('paginate', 'false');
        return this.http.get<Response<ListResponse<User>>>(this.baseUrl, { params });
    }
}
