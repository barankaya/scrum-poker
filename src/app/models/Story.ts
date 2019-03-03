import { Voter } from './Voter';

export class Story {
  id: number;
  name : string;
  voterPoints: Voter[] = [];
  scrumMasterPoint: string;
  finalScore: number;
  status: number; // 0: Not Voted, 1: Active, 2: Voted
  statusText: string;
  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
