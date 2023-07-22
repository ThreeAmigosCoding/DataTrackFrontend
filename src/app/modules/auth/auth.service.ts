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

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  isAdmin(): boolean {
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      if (helper.decodeToken(accessToken.token).admin === "True")
        return true;
    }
    return false; 
  }

  getUserId(): number{
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.token).id;
    }
    return -1;
  }

  getUserMail(): string {
    if (this.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      const accessToken = JSON.parse(accessTokenString);
      const helper = new JwtHelperService();
      return helper.decodeToken(accessToken.token).email;
    }
    return "";
  }

  register(user: UserRegistration, registeredBy: string): Observable<any>{
    console.log(registeredBy);
    const queryParams = new HttpParams().set('registeredBy', registeredBy);
    return this.http.post<any>(domain + "User/Register", user, {params: queryParams});
  }

  login(email: string | null | undefined, password: string | null | undefined) : Observable<MyTokenResponse>{
    return this.http.post<MyTokenResponse>(domain + "User/Login", {"email": email, "password": password});
  }

  setUserLogged(): void {
    this.userLogged$.next(this.isAdmin());
  }

  logout(){
    localStorage.removeItem('user');
    this.setUserLogged();
  }
}
