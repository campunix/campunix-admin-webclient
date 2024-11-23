import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from "../../../../models/department";
import {environment} from "../../../../../environments/environment";
import {Response} from "../../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class DepartmentsService {
    private baseUrl = `${environment.apiUrl}/departments`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Response<Department[]>> {
        return this.http.get<Response<Department[]>>(this.baseUrl);
    }

    get(id: number): Observable<Response<Department>> {
        return this.http.get<Response<Department>>(`${this.baseUrl}/${id}`);
    }

    create(department: Department): Observable<Response<Department>> {
        return this.http.post<Response<Department>>(this.baseUrl, department);
    }

    update(id: number, department: Department): Observable<Response<Department>> {
        return this.http.put<Response<Department>>(`${this.baseUrl}/${id}`, department);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
