import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';
import { Story } from '../models/Story';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { Guid } from 'guid-typescript';
import { Voter } from '../models/Voter';

@Component({
  selector: 'app-active-story',
  templateUrl: './active-story.component.html',
  styleUrls: ['./active-story.component.scss']
})
export class ActiveStoryComponent implements OnInit {
  @Input() isScrumMasterUser; // Scrum Master puanı ayrıca tutulmakta
  points = ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '134', '?'];
  pointInfo;
  autoRefresh: any;

  activeStory: Story;
  selectedVoted = '' ; // seçilen puan aktif gösterilecek
  voterId;

  constructor(private dataService: DataService, public globalHelper: GlobalHelper) {
    this.pointInfo = globalHelper.getLang('active-story.pleaseVote');
    this.voterId = Guid.create();
  }

  ngOnInit() {
    // Panel 2 saniyede bir güncellenmeli
    this.autoRefresh = setInterval(()=> {
      this.setPanel();
    }, 2000);
  }

  setPanel() {
    this.activeStory = this.dataService.getActiveStory();
  }

  setVote(value) {
    if(this.activeStory !== undefined) {
      this.selectedVoted = value;
      if(Boolean(Number(this.isScrumMasterUser))) {
        this.activeStory.scrumMasterPoint = this.selectedVoted;
      } else {
        const voter = new Voter();
        voter.id = this.voterId;
        voter.point = this.selectedVoted;
        const voterIndex = this.activeStory.voterPoints.findIndex(i => i.id == this.voterId);

        if(voterIndex < 0) {
          this.activeStory.voterPoints.push(voter);
        } else {
          this.activeStory.voterPoints[voterIndex] = voter;
        }
      }
      this.pointInfo = value + this.globalHelper.getLang('active-story.voted');
      const session = this.dataService.getSession();

      const activeStoryIndex = session.storyList.findIndex(x => x.id === this.activeStory.id);
      session.storyList[activeStoryIndex] = this.activeStory;
      this.dataService.updateSession(session);
    }
  }

  ngOnDestroy() {
    if (this.autoRefresh) {
      clearInterval(this.autoRefresh);
    }
  }
}
