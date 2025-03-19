import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Department} from "../../../../models/department";
import {environment} from "../../../../../environments/environment";
import {ListResponse, PaginatedResponse, Response} from "../../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class DepartmentsService {
    private baseUrl = `${environment.apiUrl}/departments`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Response<ListResponse<Department>>> {
        return this.http.get<Response<ListResponse<Department>>>(this.baseUrl);
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<Department>>> {
        return this.http.get<Response<PaginatedResponse<Department>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
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
