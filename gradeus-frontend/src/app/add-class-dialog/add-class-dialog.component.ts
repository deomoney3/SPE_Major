import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-class-dialog',
  templateUrl: './add-class-dialog.component.html',
  styleUrls: ['./add-class-dialog.component.scss']
})
export class AddClassDialogComponent implements OnInit {

  addClassForm: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<AddClassDialogComponent>) {
    // Initialize form
    this.addClassForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    
  }

  onAddClassSubmit(): void {
    this.dialogRef.close(this.addClassForm.value);
  }

  onAddClassCancel(): void {
    this.dialogRef.close();
  }
}
