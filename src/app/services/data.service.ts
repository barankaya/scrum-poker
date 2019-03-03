import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SESSION_KEY, STORY_STATUS_ACTIVE } from '../constants/global.constants';
import { Session } from '../models/Session';
import { Story } from '../models/Story';

@Injectable()
export class DataService {

  constructor(private spinner: NgxSpinnerService) { }

  addSession(session: Session) {
    this.spinner.show();

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getSessionId() {
    const session = localStorage.getItem(SESSION_KEY);
    const parsed = JSON.parse(session);
    return parsed.id;
  }

  getActiveStory(): Story {
    let session = new Session();
    session = JSON.parse(localStorage.getItem(SESSION_KEY));
    return session.storyList.find(i => i.status === STORY_STATUS_ACTIVE);
  }

  getSession(): Session {
    const session = localStorage.getItem(SESSION_KEY);
    return JSON.parse(session);
  }

  updateSession(session: Session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

}
