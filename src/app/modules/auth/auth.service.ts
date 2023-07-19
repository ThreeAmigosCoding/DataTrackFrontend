import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/models";
import {domain} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: User, registeredBy: string): Observable<any>{
    const queryParams = new HttpParams().set('registeredBy', registeredBy);
    return this.http.post<any>(domain + "/User/register", user, {params: queryParams});
  }
}
