import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponse, PaginatedResponse, Response} from "../../../../models/response";
import {Room} from "../../../../models/room";

@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    private baseUrl = `${environment.apiUrl}/rooms`;

    constructor(private http: HttpClient) {
    }

    getRoomTypes(): Observable<Response<ListResponse<string>>> {
        return this.http.get<Response<ListResponse<string>>>(`${this.baseUrl}/roomTypes/`);
    }

    getAll(): Observable<Response<ListResponse<Room>>> {
        return this.http.get<Response<ListResponse<Room>>>(this.baseUrl);
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<Room>>> {
        return this.http.get<Response<PaginatedResponse<Room>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    get(id: number): Observable<Response<Room>> {
        return this.http.get<Response<Room>>(`${this.baseUrl}/${id}`);
    }

    create(department: Room): Observable<Response<Room>> {
        return this.http.post<Response<Room>>(this.baseUrl, department);
    }

    update(id: number, department: Room): Observable<Response<Room>> {
        return this.http.put<Response<Room>>(`${this.baseUrl}/${id}`, department);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
