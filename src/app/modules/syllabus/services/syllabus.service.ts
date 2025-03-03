import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'environments/environment';
import { SyllabusData } from 'app/models/syllabus_data';
import {ListResponse, PaginatedResponse, Response, SingleItemResponse} from "app/models/response";

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
}
