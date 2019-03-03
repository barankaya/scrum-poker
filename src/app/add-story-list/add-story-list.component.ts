import { Component, OnInit } from '@angular/core';
import { GlobalHelper } from '../helpers/GlobalHelper';

import { Story } from '../models/Story';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Session } from '../models/Session';
import { STORY_STATUS_NOT_VOTED, STORY_STATUS_ACTIVE } from '../constants/global.constants';

@Component({
  selector: 'app-add-story-list',
  templateUrl: './add-story-list.component.html',
  styleUrls: ['./add-story-list.component.scss']
})
export class AddStoryListComponent implements OnInit {
  sessionName = '';
  sessionNameInvalid = false;
  numberOfVoters;
  numberOfVotersInvalid = false;
  stories;

  constructor(public globalHelper: GlobalHelper, private dataService: DataService, private router: Router) { }

  ngOnInit() {
  }

  startSession() {
    this.sessionNameInvalid = this.globalHelper.isNullOrEmptyOrUndefined(this.sessionName) || this.sessionName.length > 200 ? true : false;
    this.numberOfVotersInvalid = this.globalHelper.isNullOrEmptyOrUndefined(this.numberOfVoters) || this.numberOfVoters < 0 ? true : false;
    if (this.sessionNameInvalid) {
      alert(this.globalHelper.getLang('add-story-list.warning.sessionName'));
    } else if (!this.numberOfVotersInvalid) {
      const session = this.getSession();
      if (session.storyList.length > 0) {
        this.dataService.addSession(session);
        this.router.navigateByUrl('/poker-planning-view-as-scrum-master');
      } else {
        alert(this.globalHelper.getLang('add-story-list.warning.stories'));
      }
    }
  }

  getSession(): Session {
    const result = new Session();
    result.id = this.sessionName.split(' ').join('_') + (Math.floor(Math.random() * 50) + 1);
    result.name = this.sessionName;
    result.numberOfVoters = this.numberOfVoters;

    if (!this.globalHelper.isNullOrEmptyOrUndefined(this.stories)) {

      /* İş listesi textarea, her bir satır bir iş olarak kabul edilmeli. */
      const rows = this.stories.split(/\r|\r\n|\n/);

      for (let i = 0; i < rows.length; i++) {
        if (!this.globalHelper.isNullOrEmptyOrUndefined(rows[i])) { // Boş bırakılan satırlar eklenmeyecek
          const item = new Story();
          item.id = i + 1;
          item.name = rows[i];
          item.status = i == 0 ? STORY_STATUS_ACTIVE : STORY_STATUS_NOT_VOTED;
          result.storyList.push(item);
        }
      }
    }

    return result;
  }

}
