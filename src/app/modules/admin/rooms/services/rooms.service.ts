import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponse, PaginatedResponse, Response, SingleItemResponse} from "../../../../models/response";
import {Room} from "../../../../models/room";
import {Teacher} from "../../../../models/teacher";

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

    get(id: number): Observable<Response<SingleItemResponse<Room>>> {
        return this.http.get<Response<SingleItemResponse<Room>>>(`${this.baseUrl}/${id}`);
    }

    create(department: Room): Observable<Response<SingleItemResponse<Room>>> {
        return this.http.post<Response<SingleItemResponse<Room>>>(this.baseUrl, department);
    }

    update(id: number, department: Room): Observable<Response<SingleItemResponse<Room>>> {
        return this.http.put<Response<SingleItemResponse<Room>>>(`${this.baseUrl}/${id}`, department);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
