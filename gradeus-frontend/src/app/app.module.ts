import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { GlobalService } from './_services/global.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { AddClassDialogComponent } from './add-class-dialog/add-class-dialog.component';
import { InstructorClassComponent } from './instructor-class/instructor-class.component';
import { AddGroupDialogComponent } from './add-group-dialog/add-group-dialog.component';
import { AddTopicDialogComponent } from './add-topic-dialog/add-topic-dialog.component';
import { ClassGroupComponent } from './class-group/class-group.component';
import { AddStudentDialogComponent } from './add-student-dialog/add-student-dialog.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentTopicComponent } from './student-topic/student-topic.component';
import { InstructorTopicComponent } from './instructor-topic/instructor-topic.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    StudentDashboardComponent,
    InstructorDashboardComponent,
    AddClassDialogComponent,
    InstructorClassComponent,
    AddGroupDialogComponent,
    AddTopicDialogComponent,
    ClassGroupComponent,
    AddStudentDialogComponent,
    StudentClassComponent,
    StudentTopicComponent,
    InstructorTopicComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule
  ],
  providers: [
    GlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
