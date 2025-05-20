import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'environments/environment';
import { SyllabusData } from 'app/models/syllabus_data';
import {PaginatedResponse, Response} from "app/models/response";

@Injectable({
    providedIn: 'root',
})
export class SyllabusService {
    private baseUrl = `${environment.apiUrl}/syllabus`;

    constructor(private http: HttpClient) {
    }

    get(id: number): Observable<Response<SyllabusData>> {
        return this.http.get<Response<SyllabusData>>(`${this.baseUrl}/${id}`);
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<SyllabusData>>> {
        return this.http.get<Response<PaginatedResponse<SyllabusData>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    getAllSyllabuses(departmentId: number): Observable<Response<PaginatedResponse<SyllabusData>>> {
        return this.http.get<Response<PaginatedResponse<SyllabusData>>>(`${this.baseUrl}?departyment_id=${departmentId}`);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    uploadSyllabus(payload: any, formData: FormData): Observable<Response<SyllabusData>> {
        return this.http.post<Response<SyllabusData>>(
            `${this.baseUrl}/upload?title=${payload.title}&description=${payload.description}&calendar_year=${payload.calendar_year}&is_active=true`,
             formData);
    }
}
