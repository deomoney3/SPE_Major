import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class, ClassGroup, Topic } from '../models/models';
import { GlobalService } from '../_services/global.service';
import { InstructorService } from '../_services/instructor.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';
import { AddTopicDialogComponent } from '../add-topic-dialog/add-topic-dialog.component';

@Component({
  selector: 'app-instructor-class',
  templateUrl: './instructor-class.component.html',
  styleUrls: ['./instructor-class.component.scss']
})
export class InstructorClassComponent implements OnInit {

  classId!: number;
  currentClass!: null | Class;

  groups!: ClassGroup[];
  showAllGroups: boolean = false;

  topics!: Topic[];
  showAllTopics: boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public globalService: GlobalService,
    private instructorService: InstructorService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classId');
    if(id) {
      this.classId = <number>(<unknown>id);
    }
    else {
      this.router.navigate(['instructor-dashboard']);
      return;
    }

    this.instructorService.getClassById(this.classId).subscribe(
      (value: Class) => {
        this.currentClass = value;
      }
    )
    this.instructorService.getAllGroups(this.classId).subscribe(groups => {
      this.groups = groups;
    });

    this.instructorService.getAllTopics(this.classId).subscribe(topics => {
      this.topics = topics;
    });
  }

  openAddGroupDialog() {
    const dialogRef = this.dialog.open(AddGroupDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let groupToSend: ClassGroup = result;
        groupToSend.classObj = this.classId;

        this.instructorService.addGroup(groupToSend, this.classId).subscribe(
          (value: ClassGroup) => {
            this.groups.push(value);
          }
        );
      }
    });
  }

  viewGroupDetails(group: ClassGroup) {
    this.router.navigate([`class-group/${group.classGroupId}`]);
  }

  deleteGroup(group: ClassGroup) {
    this.instructorService.deleteGroup(group.classGroupId).subscribe(
      (value: String) => {
        const index = this.groups.indexOf(group);
        if (index >= 0) {
          this.groups.splice(index, 1);
        }
      }
    );
  }




  openAddTopicDialog() {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '500px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let topicToSend: Topic = result;
        topicToSend.classObj = this.classId;

        this.instructorService.addTopic(topicToSend, this.classId).subscribe(
          (value: Topic) => {
            this.topics.push(value);
          }
        );
      }
    });
  }

  viewTopicDetails(topic: Topic) {
    this.router.navigate([`instructor-topic/${topic.topicId}`]);
  }

  deleteTopic(topic: Topic) {
    this.instructorService.deleteGroup(topic.topicId).subscribe(
      (value: String) => {
        const index = this.topics.indexOf(topic);
        if (index >= 0) {
          this.topics.splice(index, 1);
        }
      }
    );
  }

}
