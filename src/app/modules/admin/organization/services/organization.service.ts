import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Organization } from "../../../../models/organization";
import {environment} from "../../../../../environments/environment";
import {ListResponse, Response} from "../../../../models/response";

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    private baseUrl = `${environment.apiUrl}/organizations`;

    constructor(private http: HttpClient) {
    }

    create(organization: Organization): Observable<Response<Organization>> {
        return this.http.post<Response<Organization>>(this.baseUrl, organization);
    }

    getAll(): Observable<Response<ListResponse<Organization>>> {
        return this.http.get<Response<ListResponse<Organization>>>(this.baseUrl);
    }

    get(id: number): Observable<Response<Organization>> {
        return this.http.get<Response<Organization>>(`${this.baseUrl}/${id}`);
    }

    update(id: number, organization: Organization): Observable<Response<Organization>> {
        return this.http.put<Response<Organization>>(`${this.baseUrl}/${id}`, organization);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
