import { AuthService } from './../../services/auth.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { TaskPreview } from 'src/app/models/taskPreview.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss'],
})
export class TaskPreviewComponent implements OnInit {
  public imageUrlSanitized: SafeUrl;
  public isAdmin: boolean = false;
  public userSubscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<TaskPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public taskPreview: TaskPreview,
    private sanitizer: DomSanitizer,
    private router: Router,
    public authService: AuthService
  ) {
    this.imageUrlSanitized = sanitizer.bypassSecurityTrustUrl(
      'data:image/gif;base64,' + taskPreview.image
    );
  }

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getCurrentUser()
      .subscribe((user) => {
        debugger;
        this.isAdmin = this.authService.isUserAdmin();
      });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();    
  }

  closeModal(): void {
    this.dialogRef.close();
  }
  
  executeTask(): void {
    this.dialogRef.close();
    this.router.navigate(['execute-task', this.taskPreview.id]).then();
  }
}
