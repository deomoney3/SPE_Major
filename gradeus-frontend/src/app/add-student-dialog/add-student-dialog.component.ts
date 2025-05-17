import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatList } from '@angular/material/list';
import { MatTableDataSource } from '@angular/material/table';
import { InstructorService } from '../_services/instructor.service';
import { User } from '../models/models';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.scss']
})
export class AddStudentDialogComponent implements OnInit {
  classGroupId!: number;

  constructor(
    private instructorService: InstructorService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  dataSource!: MatTableDataSource<User>;

  ngOnInit(): void {
    this.classGroupId = this.data.classGroupId;
    this.instructorService.getStudentsNotInGroup(this.data.classId).subscribe(
      (allStudents: User[]) => {
        this.dataSource = new MatTableDataSource(allStudents);
      }
    )    
  }

  applyFilter(eventTarget: any) {
    let target = eventTarget as HTMLInputElement;
    let filterValue = target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addItem(item: User) {
    this.instructorService.addStudentsToGroup([item.id], this.classGroupId).subscribe(
      () => {
        const index = this.dataSource.filteredData.indexOf(item);
        if (index >= 0) {
          this.dataSource.filteredData.splice(index, 1);
          this.dataSource._updateChangeSubscription();
        }
      }
    );
  }
}
