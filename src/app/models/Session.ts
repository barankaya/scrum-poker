import { Story } from './Story';

export class Session {
  id: string;
  name: string;
  numberOfVoters: number;
  storyList: Story[] = [];
  constructor(values: Object = {}) {
      Object.assign(this, values);
  }
}
