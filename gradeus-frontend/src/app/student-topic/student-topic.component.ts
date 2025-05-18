import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { StudentService } from '../_services/student.service';
import { Score, ScoreResponse, Topic, User } from '../models/models';

@Component({
  selector: 'app-student-topic',
  templateUrl: './student-topic.component.html',
  styleUrls: ['./student-topic.component.scss']
})
export class StudentTopicComponent implements OnInit {

  topicId!: number;
  currentTopic!: null | Topic;

  members!: User[];
  membersForm!: FormGroup;
  disabledMembers: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public globalService: GlobalService,
    private studentService: StudentService
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('topicId');
    if (id) {
      this.topicId = <number>(<unknown>id);
    }
    else {
      this.router.navigate(['student-dashboard']);
      return;
    }
    //console.log(this.topicId)
    this.studentService.getTopicById(this.topicId).subscribe(
      (currentTopic: Topic) => {

        this.currentTopic = currentTopic;
        console.log(this.currentTopic.classObj)
        this.studentService.getGroupMembersInClass(this.currentTopic.classObj).subscribe(
          (members: User[]) => {
              
            this.members = members;
            console.log(this.members);
            const formControls: any = {};

            for (let member of this.members) {
              const fieldName = member.id.toString();
              formControls[fieldName] = new FormControl(null);
            }

            this.membersForm = new FormGroup(formControls);

            for (let member of this.members) {
              console.log(member)
              this.studentService.getScore(2, this.topicId).subscribe(
                (scoreResponse: ScoreResponse) => {

                  if (scoreResponse.present) {
                    
                    const fieldName = member.id.toString();
                    this.membersForm.get(fieldName)!.disable();
                    this.membersForm.patchValue({
                      [fieldName]: scoreResponse.scoreValue
                    });
                  }
                }
              )
            }

          }
        )
      });
  }

  submitScore(member: User) {
    let scoreValue: number = this.membersForm.value[member.id];
    this.studentService.addScore({ studentId: member.id, scoreValue: scoreValue, topicId: this.topicId }).subscribe(
      (score: Score) => {
        const fieldName = member.id.toString();
        this.membersForm.get(fieldName)!.disable();
        this.membersForm.patchValue({
          [fieldName]: score.scoreValue
        });
      }
    )
  }

}
