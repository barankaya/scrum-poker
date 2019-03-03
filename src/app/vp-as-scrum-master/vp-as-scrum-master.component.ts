import { Component, OnInit } from '@angular/core';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { DataService } from '../services/data.service';
import { VP_AS_DEVELOPER_URL_PREFIX, STORY_STATUS_VOTED, STORY_STATUS_NOT_VOTED, STORY_STATUS_ACTIVE } from '../constants/global.constants';
import { Story } from '../models/Story';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-vp-as-scrum-master',
  templateUrl: './vp-as-scrum-master.component.html',
  styleUrls: ['./vp-as-scrum-master.component.scss']
})
export class VpAsScrumMasterComponent implements OnInit {
  isScrumMasterUser = 1;
  developerUrl = VP_AS_DEVELOPER_URL_PREFIX;
  activeStory: Story = undefined;
  autoRefresh: any;
  allDeveloperPointIsOk = false;
  voters: any[];
  showWarningdiffPoint = false;
  showFinalScore = false;
  showEndVotingAlert = false;
  finalScore;

  constructor(public globalHelper: GlobalHelper, private dataService: DataService) {
    this.developerUrl += dataService.getSessionId();
    this.activeStory = this.dataService.getActiveStory();
  }

  ngOnInit() {
    // Panel 2 saniyede bir güncellenmeli
    this.autoRefresh = setInterval(()=> {
      this.setMasterPanel();
    }, 2000);
  }

  setMasterPanel() {
    this.voters = [];
    this.activeStory = this.dataService.getActiveStory();
    if(this.activeStory !== undefined) {
      const session = this.dataService.getSession();
      this.allDeveloperPointIsOk = this.activeStory.voterPoints.length === session.numberOfVoters ? true : false;

      for (var i = 0; i < session.numberOfVoters; i++) {
        this.voters.push({
          name: 'Voter ' + (i+1),
          status: i < this.activeStory.voterPoints.length ? (this.allDeveloperPointIsOk ? this.activeStory.voterPoints[i].point : 'Voted') : 'Not Voted'
        });
      }

      if(this.allDeveloperPointIsOk) {
        const unique = this.activeStory.voterPoints.map(item => item.point).filter((value, index, self) => self.indexOf(value) === index);
        this.showWarningdiffPoint = unique.length === 1 ? false : true;
        this.showFinalScore = true;
      } else {
        this.showFinalScore = false;
      }
    }
  }

  endVoting() {
    if(this.activeStory !== undefined) {
      this.showEndVotingAlert = this.allDeveloperPointIsOk && !this.globalHelper.isNullOrEmptyOrUndefined(this.activeStory.scrumMasterPoint) ? false : true;

      if(this.globalHelper.isNullOrEmptyOrUndefined(this.finalScore)){
        alert(this.globalHelper.getLang('vp-as-scrum-master.warning.finalScore'));
      } else if(!this.showEndVotingAlert) {
        this.activeStory.finalScore = this.finalScore;
        this.activeStory.status = STORY_STATUS_VOTED;
        const session = this.dataService.getSession();

        const activeStoryIndex = session.storyList.findIndex(x => x.id === this.activeStory.id);
        session.storyList[activeStoryIndex] = this.activeStory;

        const notVotedStoryList = session.storyList.filter(i => i.status == STORY_STATUS_NOT_VOTED);
        if(notVotedStoryList.length > 0){
          notVotedStoryList[0].status = STORY_STATUS_ACTIVE;
          const selectedStoryIndex = session.storyList.findIndex(x => x.id === notVotedStoryList[0].id);
          session.storyList[selectedStoryIndex] = notVotedStoryList[0];
        }

        this.dataService.updateSession(session);
      }
    }
  }

  ngOnDestroy() {
    if (this.autoRefresh) {
      clearInterval(this.autoRefresh);
    }
  }
}
