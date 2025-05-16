import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class RoutineService {
    private apiBaseUrl = 'http://127.0.0.1:8000';

    constructor(private http: HttpClient) { }

    getRoutine(): any {
        let url = `${this.apiBaseUrl}/routines/generate`;
        return this.http.post<any>(url, { total_slots: 5 });
    }
    
    createClassRoutine(data: any): any {
        let url = `${this.apiBaseUrl}/routines`;
        return this.http.post<any>(url, data);
    }

    createExamRoutine(data: any): any {
        let url = `${this.apiBaseUrl}/examRoutines`;
        return this.http.post<any>(url, data);
    }
}