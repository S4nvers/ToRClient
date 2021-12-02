import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements HttpInterceptor {

  constructor(private auth: AuthService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.includes(this.auth.TOKEN_REQUEST_URI)) {
      req = req.clone({
        setHeaders: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Accept'       : 'application/json',
          'Authorization': `basic ` + btoa(`${this.auth.CLIENT_ID}:${this.auth.SECRET}`),
        },
      });
    }
    return next.handle(req);
  }
  
}
