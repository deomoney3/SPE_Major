import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from '../_services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStudentGuard implements CanActivate {
  constructor(
    private globalService: GlobalService,
    private router: Router
  ) {

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.globalService.currentCredentials) {
        if (this.globalService.currentCredentials.role == "STUDENT") {
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
