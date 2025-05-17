import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private globalService: GlobalService,
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    let postUrl = this.globalService.rootUrl + '/auth/login';
    console.log(postUrl);

    this.globalService.eraseCredentials();
    
    return this.http
      .post<any>(postUrl, { username: username, password: password })
      .pipe(
        map((credentials) => {
          console.log('The Username and password', username, ' ', password);
          console.log('The Credentials is ', credentials);

          // login successful if there's a jwt token in the response
          if (credentials) {
            this.globalService.saveCredentials(JSON.stringify(credentials));
          }

          return credentials;
        })
      );
  }

  register(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    phoneNumber: string,
    role: string
  ) {
    let postUrl = this.globalService.rootUrl + '/auth/register';
    console.log(postUrl);

    this.globalService.eraseCredentials();

    return this.http
      .post<any>(postUrl, {
        firstname: firstname,
        lastname: lastname,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
        email: email,
        role: role
      })
      .pipe(
        map((credentials) => {
          console.log('The username and password', username, ' ', password);
          console.log('The Credentials is ', credentials);

          return credentials;
        })
      );
  }

  sessionAlive(): Observable<String> {
    const url = `${this.globalService.rootUrl}/session/alive`;
    return this.http.get<String>(url);
  }
}
