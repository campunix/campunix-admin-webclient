import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../../environments/environment";
import {Department} from "../../../models/department";
import {Observable} from "rxjs";
import {Response} from "../../../models/response";
import {Token} from "../../../models/token";
import {SignIn} from "../../../models/request/sign-in";

@Injectable({
    providedIn: 'root',
})
export class SignInService {
    private baseUrl = `${environment.apiUrl}/token`;

    constructor(private http: HttpClient) { }


    sign_in(department: SignIn): Observable<Response<Token>> {
        return this.http.post<Response<Token>>(this.baseUrl, department);
    }
}
