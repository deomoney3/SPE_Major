import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  @ViewChild('fform') registerFormDirective!: any;
  registerForm!: FormGroup;
  roles: string[] = ["STUDENT", "INSTRUCTOR"];

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.formBuilder.group({
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  
  register(): void {
    let firstname = this.registerForm.value.firstname;
    let lastname = this.registerForm.value.lastname;
    let email = this.registerForm.value.email;
    let username = this.registerForm.value.username;
    let password = this.registerForm.value.password;
    let phoneNumber = this.registerForm.value.phoneNumber;
    let role = this.registerForm.value.role;

    this.registerFormDirective.resetForm();
    this.registerForm.reset({
      role: '',
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      phoneNumber: ''
    });

    this.authenticationService
      .register(firstname,
        lastname,
        email,
        username,
        password,
        phoneNumber,
        role)
      .subscribe(
        (data: any) => {
          console.log("Register Successful");
          this.router.navigate(['login'])
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

}
