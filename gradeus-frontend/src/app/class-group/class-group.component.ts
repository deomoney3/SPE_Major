import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { InstructorService } from '../_services/instructor.service';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';
import { AddTopicDialogComponent } from '../add-topic-dialog/add-topic-dialog.component';
import { Class, ClassGroup, Topic, User } from '../models/models';
import { AddStudentDialogComponent } from '../add-student-dialog/add-student-dialog.component';

@Component({
  selector: 'app-class-group',
  templateUrl: './class-group.component.html',
  styleUrls: ['./class-group.component.scss']
})
export class ClassGroupComponent implements OnInit {

  classGroupId!: number;
  currentGroup!: null | ClassGroup;

  students!: User[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    public globalService: GlobalService,
    private instructorService: InstructorService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classGroupId');
    if(id) {
      this.classGroupId = <number>(<unknown>id);
    }
    else {
      this.router.navigate(['instructor-dashboard']);
      return;
    }

    this.instructorService.getGroupById(this.classGroupId).subscribe(
      (value: ClassGroup) => {
        this.currentGroup = value;
      }
    )

    this.instructorService.getStudentsInGroup(this.classGroupId).subscribe(students => {
      this.students = students;
    });
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(AddStudentDialogComponent, {
      width: '500px',
      data: {classGroupId: this.classGroupId, classId: this.currentGroup?.classObj},
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.instructorService.getStudentsInGroup(this.classGroupId).subscribe(students => {
        this.students = students;
      });
    });
  }

  viewStudentDetails(student: User): void {
  }

  deleteStudent(student: User): void {
    this.instructorService.deleteStudentFromGroup(student.id, this.classGroupId).subscribe(
      (value: String) => {
        const index = this.students.indexOf(student);
        if (index >= 0) {
          this.students.splice(index, 1);
        }
      }
    )
  }
}
