import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Class, Score, ScoreRequest, ScoreResponse, Topic, User } from '../models/models';
import { GlobalService } from './global.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  prefix: string = environment.rootUrl + "/student";
  constructor(
    globalService: GlobalService,
    private http: HttpClient
  ) {

  }

  getAllClasses(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.prefix}/classes`);
  }
  
  getAllTopics(classId: number): Observable<Topic[]> {
    const url = `${this.prefix}/topics?classId=${classId}`;
    return this.http.get<Topic[]>(url);
  }

  getTopicById(id: number): Observable<Topic> {
    const url = `${this.prefix}/topic/${id}`;
    return this.http.get<Topic>(url);
  }
  
  getGroupMembersInClass(classId: number): Observable<User[]> {
    const url = `${this.prefix}/group-members?classId=${classId}`;
    return this.http.get<User[]>(url);
  }

  getScore(studentId: number, topicId: number): Observable<ScoreResponse> {
    const url = `${this.prefix}/get-score?studentId=${studentId}&topicId=${topicId}`;
    return this.http.get<ScoreResponse>(url);
  }

  addScore(score: ScoreRequest): Observable<Score> {
    const url = `${this.prefix}/add-score`;
    return this.http.post<Score>(url, score);
  }
}
