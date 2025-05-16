import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClassRoutine } from "app/models/classRoutine";
import { PaginatedResponse, Response } from "app/models/response";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RoutineService {
    private apiBaseUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) { }

    getRoutine(department_id: number): any {
        let url = `${this.apiBaseUrl}/routines/generate`;
        return this.http.post<any>(url, { department_id: department_id, total_slots: 5 });
    }
    
    createClassRoutine(data: any): any {
        let url = `${this.apiBaseUrl}/routines`;
        return this.http.post<any>(url, data);
    }

    createExamRoutine(data: any): any {
        let url = `${this.apiBaseUrl}/examRoutines`;
        return this.http.post<any>(url, data);
    }

    getPaginatedClassRoutines(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<ClassRoutine>>> {
        return of<Response<PaginatedResponse<ClassRoutine>>>();
        // return this.http.get<Response<PaginatedResponse<ClassRoutine>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    deleteClassRoutine(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
    }
}