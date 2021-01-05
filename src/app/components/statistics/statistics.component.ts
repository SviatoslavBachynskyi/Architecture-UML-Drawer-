import { Component, OnInit } from '@angular/core';

const chartSize = 386;

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  taskMarksChart = {
    data: [
        { x: ['Завдання 1', 'Завдання 2', 'Завдання 3'], y: [9, 4, 6], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
    ],
    layout: { width: chartSize * 1.2, height: chartSize, title: 'Оцінки за завдання',
      xaxis: { title: { text: 'Завдання' }},
      yaxis: { title: { text: 'Оцінка' }}
    }
  };

  taskTimeChart = {
    data: [
        { x: ['Завдання 1', 'Завдання 2', 'Завдання 3'], y: [15, 12, 13], type: 'bar', width: 0.667, marker: {color: '#3366cc'} }
    ],
    layout: { width: chartSize * 1.2, height: chartSize, title: 'Час виконання завдань',
      xaxis: { title: { text: 'Завдання' }},
      yaxis: { title: { text: 'Час виконання (хв)' }}
    }
  };


  constructor() {}

  ngOnInit(): void {
  }

}
