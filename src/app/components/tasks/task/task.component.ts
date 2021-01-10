import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Task } from 'src/app/models/data/task.model';
import { TaskPreviewComponent } from './../../../modals/task-preview/task-preview.component';
import { TaskPreviewService } from './../../../services/taskPreview.service';
import { TaskPreview } from './../../../models/taskPreview.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor(public taskPreviewService: TaskPreviewService,public matDialog: MatDialog) {}

  ngOnInit(): void {}

  shrinkString(str: String, preferedLenghth: number) : String{
    return (str.length > preferedLenghth) ? str.substring(0, preferedLenghth) + '...' : str;
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig<TaskPreview>();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "900px";
    dialogConfig.width = "800px";
    dialogConfig.data = this.taskPreviewService.getTaskPreview(this.task.id);
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(TaskPreviewComponent, dialogConfig);
  }

}
