import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  rootUrl: string = environment.rootUrl;
  recordList: any[] = [];
  constructor() {}

  saveCredentials(cred: string): void {
    localStorage.setItem('currentCredentials', cred);
  }
  get currentCredentials(): any {
    const currCredentials = localStorage.getItem('currentCredentials');
    if (currCredentials) return JSON.parse(currCredentials);
    else return null;
  }
  eraseCredentials(): void {
    localStorage.removeItem('currentCredentials');
  }

  addRecord(record: any) {
    this.recordList.push(record);
    localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  clearRecords() {
    this.recordList = [];
    localStorage.setItem('recordList', JSON.stringify(this.recordList));
  }

  loadRecords() {
    this.recordList = [];
    let lis = localStorage.getItem('recordList');
    if(lis) {
      this.recordList = JSON.parse(lis)
    } 
  }
}
