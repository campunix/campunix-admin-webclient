import {Injectable} from "@angular/core";
import {environment} from "../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListResponse, PaginatedResponse, Response} from "../../../../models/response";
import {Preference} from "../../../../models/preference";

@Injectable({
    providedIn: 'root',
})
export class PreferenceService {
    private baseUrl = `${environment.apiUrl}/preferences`;

    constructor(private http: HttpClient) {
    }

    getDays(): Observable<Response<ListResponse<string>>> {
        return this.http.get<Response<ListResponse<string>>>(`${this.baseUrl}/days`);
    }

    getAll(preference_id: number): Observable<Response<ListResponse<Preference>>> {
        return this.http.get<Response<PaginatedResponse<Preference>>>(`${this.baseUrl}?paginated=${false}&preference_id=${preference_id}`);
    }

    getAllPaginated(page: number, pageSize: number, searchQuery: string): Observable<Response<PaginatedResponse<Preference>>> {
        return this.http.get<Response<PaginatedResponse<Preference>>>(`${this.baseUrl}?page=${page}&page_size=${pageSize}&search_query=${searchQuery}`);
    }

    get(id: number): Observable<Response<Preference>> {
        return this.http.get<Response<Preference>>(`${this.baseUrl}/${id}`);
    }

    create(preference: Preference): Observable<Response<Preference>> {
        return this.http.post<Response<Preference>>(this.baseUrl, preference);
    }

    update(id: number, preference: Preference): Observable<Response<Preference>> {
        return this.http.put<Response<Preference>>(`${this.baseUrl}/${id}`, preference);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
