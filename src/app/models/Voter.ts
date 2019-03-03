export class Voter {
  id: string;
  point: string;
  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
