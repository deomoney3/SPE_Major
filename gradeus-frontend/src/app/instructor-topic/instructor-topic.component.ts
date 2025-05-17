import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../_services/global.service';
import { StudentService } from '../_services/student.service';
import { Topic, User, ScoreResponse, Score, ScoreFull } from '../models/models';
import { InstructorService } from '../_services/instructor.service';

@Component({
  selector: 'app-instructor-topic',
  templateUrl: './instructor-topic.component.html',
  styleUrls: ['./instructor-topic.component.scss']
})
export class InstructorTopicComponent implements OnInit {

  topicId!: number;
  currentTopic!: null | Topic;
  scoreFullList!: ScoreFull[];

  groups: { student: User, scores: ScoreFull[], totalScore: number }[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public globalService: GlobalService,
    private instructorService: InstructorService
  ) {

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('topicId');
    if (id) {
      this.topicId = <number>(<unknown>id);
    }
    else {
      this.router.navigate(['instructor-dashboard']);
      return;
    }

    this.instructorService.getTopicById(this.topicId).subscribe(
      (currentTopic: Topic) => {
        this.currentTopic = currentTopic;
      });

      this.instructorService.getScoresInTopic(this.topicId).subscribe(
        (scores: ScoreFull[]) => {
          this.scoreFullList = scores;
          console.log(this.scoreFullList)

          const groups: any = {};
          scores.forEach(score => {
            const studentId = score.student.id;
            if (!groups[studentId]) {
              groups[studentId] = { student: score.student, scores: [], totalScore: 0 };
            }
            groups[studentId].scores.push(score);
            groups[studentId].totalScore += score.scoreValue;
          });

          this.groups = Object.values(groups);
        }
      )
  }

  onDelete(score: ScoreFull): void {
    this.instructorService.deleteScore(score.student.id, score.scorer!.id, score.topic).subscribe(
      (value) => {
        const group = this.groups.find(g => g.student.id === score.student.id);
        group!.scores = group!.scores.filter(s => s.scoreId !== score.scoreId);
        group!.totalScore -= score.scoreValue;
      }
    )
  }
}
