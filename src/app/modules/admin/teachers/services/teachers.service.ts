import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {ListResponse, PaginatedResponse, Response, SingleItemResponse} from '../../../../models/response';
import { Teacher } from 'app/models/teacher';

@Injectable({
    providedIn: 'root',
})
export class TeachersService {
    private baseUrl = `${environment.apiUrl}/teachers`;

    constructor(private http: HttpClient) { }

    getAllPaginated(page: number, pageSize: number): Observable<Response<PaginatedResponse<Teacher>>> {
        return this.http.get<Response<PaginatedResponse<Teacher>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}`);
    }

    get(id: number): Observable<Response<SingleItemResponse<Teacher>>> {
        return this.http.get<Response<SingleItemResponse<Teacher>>>(`${this.baseUrl}/${id}`);
    }

    create(teacher: Teacher): Observable<Response<SingleItemResponse<Teacher>>> {
        return this.http.post<Response<SingleItemResponse<Teacher>>>(this.baseUrl, teacher);
    }

    update(id: number, teacher: Teacher): Observable<Response<SingleItemResponse<Teacher>>> {
        return this.http.put<Response<SingleItemResponse<Teacher>>>(`${this.baseUrl}/${id}`, teacher);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getAllDesignations(): Observable<Response<ListResponse<string>>> {
        return this.http.get<Response<ListResponse<string>>>(`${this.baseUrl}/teacherDesignations`);
    }

    getAllStatuses(): Observable<Response<ListResponse<string>>> {
        return this.http.get<Response<ListResponse<string>>>(`${this.baseUrl}/teacherStatus`);
    }
}
