import { Injectable } from '@angular/core';
import * as stringSimilarity from 'string-similarity';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor() { }

  evaluateTask(etalon: string, completedTask: string, maxMark: number): number {
    return stringSimilarity.compareTwoStrings(etalon, completedTask) * maxMark;
  }
}
