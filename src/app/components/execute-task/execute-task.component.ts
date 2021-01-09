import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-execute-task',
  templateUrl: './execute-task.component.html',
  styleUrls: ['./execute-task.component.scss']
})
export class ExecuteTaskComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      const drawIo = document.querySelector('iframe');
      drawIo.contentWindow.postMessage({handlerName: 'addTaskSubmitButton'}, '*');
    }, 3500);
  }
}
