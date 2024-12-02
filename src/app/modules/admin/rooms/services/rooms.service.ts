import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Response} from "../../../../models/response";
import {Room} from "../../../../models/room";

@Injectable({
    providedIn: 'root',
})
export class RoomsService {
    private baseUrl = `${environment.apiUrl}/rooms`;

    constructor(private http: HttpClient) {
    }

    getAll(): Observable<Response<Room[]>> {
        return this.http.get<Response<Room[]>>(this.baseUrl);
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
