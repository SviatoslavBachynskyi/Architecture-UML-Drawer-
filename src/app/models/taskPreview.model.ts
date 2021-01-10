import { Mark } from './mark.model';

export interface TaskPreview {
  id: number;
  title: string;
  type: string;
  image: string;
  level: string;
  description: string;
  bestExecutionTime?: Date;
  currentMark?: number;
  marks?: Mark[]; // Mark for now
}
