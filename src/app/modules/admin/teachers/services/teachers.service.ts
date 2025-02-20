import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Response } from '../../../../models/response';
import { Teacher } from 'app/models/teacher';

@Injectable({
    providedIn: 'root',
})
export class TeachersService {
    private baseUrl = `${environment.apiUrl}/teachers`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Response<Teacher[]>> {
        return this.http.get<Response<Teacher[]>>(this.baseUrl);
    }

    get(id: number): Observable<Response<Teacher>> {
        return this.http.get<Response<Teacher>>(`${this.baseUrl}/${id}`);
    }

    create(teacher: Teacher): Observable<Response<Teacher>> {
        return this.http.post<Response<Teacher>>(this.baseUrl, teacher);
    }

    update(id: number, teacher: Teacher): Observable<Response<Teacher>> {
        return this.http.put<Response<Teacher>>(`${this.baseUrl}/${id}`, teacher);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    getAllDesignations(): Observable<Response<string[]>> {
        return this.http.get<Response<string[]>>(`${this.baseUrl}/teacherDesignations`);
    }

    getAllStatuses(): Observable<Response<string[]>> {
        return this.http.get<Response<string[]>>(`${this.baseUrl}/teacherStatus`);
    }
}
