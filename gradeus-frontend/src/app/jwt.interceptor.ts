import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from './_services/global.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private globalservice: GlobalService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Intercepts every http request to the server and adds the JWT token to the header
    if (this.globalservice.currentCredentials && this.globalservice.currentCredentials.token) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.globalservice.currentCredentials.token}`
            }
        });
    }

    return next.handle(request);
  }
}
