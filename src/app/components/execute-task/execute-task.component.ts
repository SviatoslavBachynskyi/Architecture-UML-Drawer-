import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-execute-task',
  templateUrl: './execute-task.component.html',
  styleUrls: ['./execute-task.component.scss']
})
export class ExecuteTaskComponent implements OnInit {

  constructor() {
    window.addEventListener('message', (msg) => {
      console.log(msg);
      console.log(msg.data.diagramObjects);
    }, false);
  }

  ngOnInit(): void {
    setTimeout(() => {
      const drawIo = document.querySelector('iframe');
      drawIo.contentWindow.postMessage({handlerName: 'addTaskSubmitButton'}, '*');
    }, 3500);
  }
}
