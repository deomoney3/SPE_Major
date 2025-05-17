import { Component, OnInit } from '@angular/core';
import { StudentService } from '../_services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { InstructorService } from '../_services/instructor.service';
import { Class } from '../models/models';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  classes: Class[] = [];

  constructor(
    private studentService: StudentService,
    public globalService: GlobalService,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.studentService.getAllClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  viewDetails(course: Class): void {
    this.router.navigate([`student-class/${course.classId}`]);
  }
}
