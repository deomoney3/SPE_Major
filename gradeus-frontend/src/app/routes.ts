import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { InstructorClassComponent } from './instructor-class/instructor-class.component';
import { ClassGroupComponent } from './class-group/class-group.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { StudentTopicComponent } from './student-topic/student-topic.component';
import { InstructorTopicComponent } from './instructor-topic/instructor-topic.component';
import {AboutComponent} from "./about/about.component";
import { NotAuthGuard } from './_guards/not-auth.guard';
import { AuthGuard } from './_guards/auth.guard';
import { AuthStudentGuard } from './_guards/auth-student.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[NotAuthGuard] },
  { path: '', component: LoginComponent, canActivate:[NotAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate:[NotAuthGuard] },
  { path: 'instructor-dashboard', component: InstructorDashboardComponent, canActivate:[AuthGuard] },
  { path: 'instructor-class/:classId', component: InstructorClassComponent, canActivate:[AuthGuard] },
  { path: 'instructor-topic/:topicId', component: InstructorTopicComponent, canActivate:[AuthGuard] },
  { path: 'class-group/:classGroupId', component: ClassGroupComponent, canActivate:[AuthGuard] },
  { path: 'student-dashboard', component: StudentDashboardComponent, canActivate:[AuthStudentGuard] },
  { path: 'student-class/:classId', component: StudentClassComponent, canActivate:[AuthStudentGuard] },
  { path: 'student-topic/:topicId', component: StudentTopicComponent, canActivate:[AuthStudentGuard] },
  { path: 'about', component: AboutComponent }
];
