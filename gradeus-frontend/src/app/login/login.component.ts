import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { GlobalService } from '../_services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  @ViewChild('fform') loginFormDirective!: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  login() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.loginFormDirective.resetForm();
    this.loginForm.reset({
      username: '',
      password: '',
    });

    this.authenticationService.login(username, password).subscribe(
      (data: any) => {
        this.postLogin();
        console.log('Login Successful!');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  postLogin(): void {
    if(this.globalService.currentCredentials.role == "STUDENT") {
      this.router.navigate(['student-dashboard']);
    }
    else if(this.globalService.currentCredentials.role == "INSTRUCTOR") {
      this.router.navigate(['instructor-dashboard']);
    }
  }
}
