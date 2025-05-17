import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddGroupDialogComponent } from '../add-group-dialog/add-group-dialog.component';

@Component({
  selector: 'app-add-topic-dialog',
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss']
})
export class AddTopicDialogComponent implements OnInit {
  addTopic: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddGroupDialogComponent>) {
    // Initialize form
    this.addTopic = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
  }

  onAddClassSubmit(): void {
    this.dialogRef.close(this.addTopic.value);
  }

  onAddClassCancel(): void {
    this.dialogRef.close();
  }
}
