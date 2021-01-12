import { Injectable } from '@angular/core';
import * as stringSimilarity from 'string-similarity';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor() { }

  evaluateTask(etalon: string, completedTask: string, maxMark: number): number {
    const mark = stringSimilarity.compareTwoStrings(etalon, completedTask) * maxMark;
    return +mark.toFixed(1);
  }
}
