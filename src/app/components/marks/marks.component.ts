import { Mark } from './../../models/mark';
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
      { task: "Фабричний метод", value: 4, dateCompleted: new Date("2020/12/25"), attemptNumber: 1, },
      { task: "Фабричний метод", value: 5, dateCompleted: new Date("2020/12/24"), attemptNumber: 2, },
    ];
  }

}