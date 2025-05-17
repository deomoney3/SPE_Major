import { Component, OnInit } from '@angular/core';
import { StudentService } from '../_services/student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { Class, Topic } from '../models/models';

@Component({
  selector: 'app-student-class',
  templateUrl: './student-class.component.html',
  styleUrls: ['./student-class.component.scss']
})
export class StudentClassComponent implements OnInit {

  classId!: number;
  currentClass!: null | Class;

  topics!: Topic[];

  constructor(private route: ActivatedRoute,
    private router: Router,
    public globalService: GlobalService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classId');
    if(id) {
      this.classId = <number>(<unknown>id);
    }
    else {
      this.router.navigate(['student-dashboard']);
      return;
    }

    this.studentService.getAllTopics(this.classId).subscribe(topics => {
      this.topics = topics;
    });
  }

  viewTopicDetails(topic: Topic) {
    this.router.navigate([`student-topic/${topic.topicId}`]);
  }

}
