import { Mark } from '../../models/mark.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marks',
  templateUrl: './marks.component.html',
  styleUrls: ['./marks.component.scss']
})
export class MarksComponent implements OnInit {

  marks: Mark[];

  constructor() { }

  ngOnInit(): void {
    //let fst : Mark =;
    this.marks = [
      { task: "Фабричний метод", value: 5, timeSpent: new Date(0, 0, 0, 0, 10, 35), dateCompleted: new Date("2020/12/25"), attemptNumber: 2, },
      { task: "Фабричний метод", timeSpent: new Date(0, 0, 0, 0, 15, 48), value: 4, dateCompleted: new Date("2020/12/24"), attemptNumber: 1, },
    ];
  }

}