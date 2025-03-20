import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponse, PaginatedResponse, Response} from "../../../../models/response";
import {Course} from "../../../../models/course";

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private baseUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient) {
    }

    getCourseTypes(): Observable<Response<ListResponse<string>>> {
        return this.http.get<Response<ListResponse<string>>>(`${this.baseUrl}/courseTypes/`);
    }

    getAll(department_id: number): Observable<Response<ListResponse<Course>>> {
        return this.http.get<Response<PaginatedResponse<Course>>>(`${this.baseUrl}?paginated=${false}&department_id=${department_id}`);
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<Course>>> {
        return this.http.get<Response<PaginatedResponse<Course>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    getAllByTeacherIdPaginated(teacherId: number, page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<Course>>> {
        return this.http.get<Response<PaginatedResponse<Course>>>(`${this.baseUrl}/byTeacher?teacher_id=${teacherId}&page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    get(id: number): Observable<Response<Course>> {
        return this.http.get<Response<Course>>(`${this.baseUrl}/${id}`);
    }

    create(course: Course): Observable<Response<Course>> {
        return this.http.post<Response<Course>>(this.baseUrl, course);
    }

    update(id: number, course: Course): Observable<Response<Course>> {
        return this.http.put<Response<Course>>(`${this.baseUrl}/${id}`, course);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
