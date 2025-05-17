import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Observable, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalService } from './_services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gradeus-frontend';
  constructor(
    private authService: AuthenticationService,
    private globalService: GlobalService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.authService.sessionAlive()
      .pipe(
        catchError(
          (err: HttpErrorResponse) => {
            console.log(err);
            return of(false);
          }
        )
      ).subscribe(
        (data: boolean | String) => {
          if (data === false && this.globalService.currentCredentials) {
            alert("The session has expired, please log in again.")
            this.globalService.eraseCredentials();
            this.router.navigate(['/']);
          }
        }
      );
  }
}
