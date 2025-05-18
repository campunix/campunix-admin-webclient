import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClassRoutine } from "app/models/classRoutine";
import { ExamRoutine } from "app/models/examRoutine";
import { PaginatedResponse, Response } from "app/models/response";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class RoutineService {
    private apiBaseUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) { }

    getRoutine(syllabusId: number): any {
        let url = `${this.apiBaseUrl}/routines/generate`;
        return this.http.post<any>(url, { syllabus_id: syllabusId, total_slots: 5 });
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
        return this.http.get<Response<PaginatedResponse<ClassRoutine>>>(`${this.apiBaseUrl}/routines?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    getPaginatedExamRoutines(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<ExamRoutine>>> {
        return this.http.get<Response<PaginatedResponse<ExamRoutine>>>(`${this.apiBaseUrl}/examRoutines?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    deleteClassRoutine(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiBaseUrl}/${id}`);
    }
}