import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../../../models/response";
import {Course} from "../../../../models/course";

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private baseUrl = `${environment.apiUrl}/courses`;

    constructor(private http: HttpClient) {
    }

    getCourseTypes(): Observable<Response<string[]>> {
        return this.http.get<Response<string[]>>(`${this.baseUrl}/course_types/`);
    }

    getAll(): Observable<Response<Course[]>> {
        return this.http.get<Response<Course[]>>(this.baseUrl);
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
