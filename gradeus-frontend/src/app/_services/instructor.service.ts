import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GlobalService } from './global.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class, ClassGroup, ScoreFull, Topic, User } from '../models/models';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  prefix: string = environment.rootUrl + "/instructor";
  constructor(
    globalService: GlobalService,
    private http: HttpClient
  ) {

  }

  addClass(newClass: Class, teacherId: number): Observable<Class> {
    const url = `${this.prefix}/class?teacherId=${teacherId}`;
    return this.http.post<Class>(url, newClass);
  }

  getAllClasses(): Observable<Class[]> {
    const url = `${this.prefix}/classes`;
    return this.http.get<Class[]>(url);
  }

  getClassById(id: number): Observable<Class> {
    const url = `${this.prefix}/class/${id}`;
    return this.http.get<Class>(url);
  }

  deleteClass(id: number): Observable<string> {
    const url = `${this.prefix}/class/${id}`;
    return this.http.delete<string>(url);
  }

  addGroup(newGroup: ClassGroup, classId: number): Observable<ClassGroup> {
    const url = `${this.prefix}/group?classId=${classId}`;
    return this.http.post<ClassGroup>(url, newGroup);
  }

  getAllGroups(classId: number): Observable<ClassGroup[]> {
    const url = `${this.prefix}/groups?classId=${classId}`;
    return this.http.get<ClassGroup[]>(url);
  }

  getGroupById(id: number): Observable<ClassGroup> {
    const url = `${this.prefix}/group/${id}`;
    return this.http.get<ClassGroup>(url);
  }

  deleteGroup(id: number): Observable<string> {
    const url = `${this.prefix}/group/${id}`;
    return this.http.delete<string>(url);
  }

  addTopic(newTopic: Topic, classId: number): Observable<Topic> {
    const url = `${this.prefix}/topic?classId=${classId}`;
    return this.http.post<Topic>(url, newTopic);
  }

  getAllTopics(classId: number): Observable<Topic[]> {
    const url = `${this.prefix}/topics?classId=${classId}`;
    return this.http.get<Topic[]>(url);
  }

  getTopicById(id: number): Observable<Topic> {
    const url = `${this.prefix}/topic/${id}`;
    return this.http.get<Topic>(url);
  }

  deleteTopic(id: number): Observable<string> {
    const url = `${this.prefix}/topic/${id}`;
    return this.http.delete<string>(url);
  }

  addStudentsToGroup(studentIds: number[], groupId: number): Observable<void> {
    const url = `${this.prefix}/group/students?groupId=${groupId}`;
    return this.http.post<void>(url, {ids: studentIds});
  }

  deleteStudentFromGroup(studentId: number, groupId: number): Observable<string> {
    const url = `${this.prefix}/group/student/${studentId}?groupId=${groupId}`;
    return this.http.delete<string>(url);
  }

  getStudentsInGroup(groupId: number): Observable<User[]> {
    const url = `${this.prefix}/group/students?groupId=${groupId}`;
    return this.http.get<User[]>(url);
  }

  getStudentsNotInGroup(classId: number): Observable<User[]> {
    const url = `${this.prefix}/not-group/students?classId=${classId}`;
    return this.http.get<User[]>(url);
  }

  getAllStudents(): Observable<User[]> {
    const url = `${this.prefix}/students`;
    return this.http.get<User[]>(url);
  }

  getScoresInTopic(topicId: number): Observable<ScoreFull[]> {
    const url = `${this.prefix}/scores?topicId=${topicId}`;
    return this.http.get<ScoreFull[]>(url);
  } 

  deleteScore(studentId: number, scorerId: number, topicId: number): Observable<String> {
    const url = `${this.prefix}/score?studentId=${studentId}&scorerId=${scorerId}&topicId=${topicId}`;
    return this.http.delete<String>(url);
  }
}
