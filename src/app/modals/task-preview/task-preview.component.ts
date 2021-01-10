import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TaskPreview } from 'src/app/models/taskPreview.model';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss'],
})
export class TaskPreviewComponent implements OnInit {
  public imageUrlSanitized: SafeUrl;

  constructor(
    public dialogRef: MatDialogRef<TaskPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public taskPreview: TaskPreview,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.imageUrlSanitized = sanitizer.bypassSecurityTrustUrl(
      'data:image/gif;base64,' + taskPreview.image
    );
  }

  ngOnInit(): void {}

  closeModal(): void {
    this.dialogRef.close();
    this.router.navigate(['execute-task', this.taskPreview.id]).then();
  }
}
