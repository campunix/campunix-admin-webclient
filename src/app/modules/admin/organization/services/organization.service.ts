import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Organization } from "../../../../models/organization";
import {environment} from "../../../../../environments/environment";
import {ListResponse, PaginatedResponse, Response, SingleItemResponse} from "../../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    private baseUrl = `${environment.apiUrl}/organizations`;

    constructor(private http: HttpClient) {
    }

    create(organization: Organization): Observable<Response<SingleItemResponse<Organization>>> {
        return this.http.post<Response<SingleItemResponse<Organization>>>(this.baseUrl, organization);
    }

    getAll(): Observable<Response<ListResponse<Organization>>> {
        return this.http.get<Response<ListResponse<Organization>>>(this.baseUrl);
    }

    get(id: number): Observable<Response<SingleItemResponse<Organization>>> {
        return this.http.get<Response<SingleItemResponse<Organization>>>(`${this.baseUrl}/${id}`);
    }

    update(id: number, organization: Organization): Observable<Response<SingleItemResponse<Organization>>> {
        return this.http.put<Response<SingleItemResponse<Organization>>>(`${this.baseUrl}/${id}`, organization);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
