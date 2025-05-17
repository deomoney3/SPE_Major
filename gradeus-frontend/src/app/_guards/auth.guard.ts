import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';
import { GlobalService } from '../_services/global.service';
import { AuthenticationService } from '../_services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private globalService: GlobalService,
    private router: Router,
    private authService: AuthenticationService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    // return this.authService.sessionAlive()
    //   .pipe(
    //     catchError(
    //       (err: HttpErrorResponse) => {
    //         return of(false);
    //       }
    //     )
    //   ).pipe(
    //     map(
    //       (data: boolean | String) => {
    //         if(data && this.globalService.currentCredentials.role == "INSTRUCTOR") {
    //           return true;
    //         }
    //         return false;
    //       }
    //     )
    //   );

    if (this.globalService.currentCredentials) {
      if (this.globalService.currentCredentials.role == "INSTRUCTOR") {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }

}

