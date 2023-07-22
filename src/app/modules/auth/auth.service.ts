import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {domain} from "../../environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MyTokenResponse, UserRegistration} from "../../model/models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLogged$ = new BehaviorSubject<any>(null);
  userLoggedState$ = this.userLogged$.asObservable();

  constructor(private http: HttpClient) { }

  register(user: UserRegistration, registeredBy: string): Observable<any>{
    const queryParams = new HttpParams().set('registeredBy', registeredBy);
    return this.http.post<any>(domain + "/User/register", user, {params: queryParams});
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      const roles = helper.decodeToken(accessToken.accessToken).role;

      const roleNames = roles.map((obj: { name: any; }) => obj.name);

      return roleNames;
    }
    return null;
  }

  getUserId(): number{
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.accessToken).id;
    }
    return -1;
  }

  getUserMail(): string {
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.accessToken).sub;
    }
    return "";
  }

  //TODO: add good routes
  login(email: string | null | undefined, password: string | null | undefined) : Observable<MyTokenResponse>{
    return this.http.post<MyTokenResponse>("", {"email": email, "password": password});
  }
  setUserLogged(): void {
    this.userLogged$.next(this.getRole());
  }

  logout(){
    localStorage.removeItem('user');
    this.setUserLogged();
  }
}
