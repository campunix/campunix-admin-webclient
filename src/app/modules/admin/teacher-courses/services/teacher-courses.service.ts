import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {ListResponse, PaginatedResponse, Response, SingleItemResponse} from '../../../../models/response';
import {Teacher} from 'app/models/teacher';
import {TeacherCourseIn, TeacherCourses} from "../../../../models/teacher-courses";

@Injectable({
    providedIn: 'root',
})
export class TeacherCoursesService {
    private baseUrl = `${environment.apiUrl}/teacherCourse`;

    constructor(private http: HttpClient) {
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<TeacherCourses>>> {
        return this.http.get<Response<PaginatedResponse<TeacherCourses>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    get(id: number): Observable<Response<SingleItemResponse<TeacherCourses>>> {
        return this.http.get<Response<SingleItemResponse<TeacherCourses>>>(`${this.baseUrl}/${id}`);
    }

    create(teacherCourse: TeacherCourseIn): Observable<Response<SingleItemResponse<TeacherCourses>>> {
        return this.http.post<Response<SingleItemResponse<TeacherCourses>>>(this.baseUrl, teacherCourse);
    }

    update(id: number, teacher: TeacherCourses): Observable<Response<SingleItemResponse<TeacherCourses>>> {
        return this.http.put<Response<SingleItemResponse<TeacherCourses>>>(`${this.baseUrl}/${id}`, teacher);
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
