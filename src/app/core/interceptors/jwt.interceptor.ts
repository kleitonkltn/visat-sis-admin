import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.auth.isAuthenticated) {
      const reqToken = this.addToken(req);
      return next.handle(reqToken)
    }
    return next.handle(req);
  }


  addToken(req: HttpRequest<any>): HttpRequest<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.auth._token,
      }),
    };
    return req.clone(httpOptions);
  }
}
