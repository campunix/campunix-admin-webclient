import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class RoutineService {
    constructor(private http: HttpClient) { }

    getRoutine(): any {
        let url = `http://127.0.0.1:8000/routine`;
        return this.http.post<any>(url, { total_slots: 5 });
    }
}