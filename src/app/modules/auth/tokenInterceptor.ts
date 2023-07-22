import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isLoggedIn()) {
      const accessTokenString: any = localStorage.getItem('user');
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${JSON.parse(accessTokenString).token}`
        }
      });
    }
    return next.handle(request);
  }
}
