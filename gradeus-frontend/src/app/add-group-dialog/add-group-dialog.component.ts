import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-group-dialog',
  templateUrl: './add-group-dialog.component.html',
  styleUrls: ['./add-group-dialog.component.scss']
})
export class AddGroupDialogComponent implements OnInit {
  addGroup: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddGroupDialogComponent>) {
    // Initialize form
    this.addGroup = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
  }

  onAddClassSubmit(): void {
    this.dialogRef.close(this.addGroup.value);
  }

  onAddClassCancel(): void {
    this.dialogRef.close();
  }

}
