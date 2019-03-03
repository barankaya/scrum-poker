import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { GlobalHelper } from '../helpers/GlobalHelper';
import { DataService } from '../services/data.service';
import { Story } from '../models/Story';

@Component({
  selector: 'app-story-table',
  templateUrl: './story-table.component.html',
  styleUrls: ['./story-table.component.scss']
})
export class StoryTableComponent implements OnInit {
  settings: any;
  source: LocalDataSource;
  autoRefresh: any;

  constructor(public globalHelper: GlobalHelper, private dataService: DataService) {
    this.settings = this.getSettings();
    this.source = new LocalDataSource([]);
  }

  ngOnInit() {

    // Story Tablosu 2 saniyede bir güncellenmeli
    this.autoRefresh = setInterval(()=> {
      this.getData();
    }, 2000);
  }

  getData() {
    const session = this.dataService.getSession();
    this.setTableData(session.storyList);
  }

  setTableData(storyList: Story[]) {
    storyList.forEach(i => i.statusText = this.globalHelper.getLang('story.statusText.' + i.status));
    this.source = new LocalDataSource(storyList);
  }

  getSettings() {
    return {
      columns: {
        name: {
          title: this.globalHelper.getLang('story.name')
        },
        finalScore: {
          title: this.globalHelper.getLang('story.finalScore')
        },
        statusText: {
          title: this.globalHelper.getLang('story.statusText')
        }
      },
      hideSubHeader: true,
      actions: {
        columnTitle: '',
        add: false,
        edit: false,
        delete: false,
        position: 'right'
      }
    };
  }

  ngOnDestroy() {
    if (this.autoRefresh) {
      clearInterval(this.autoRefresh);
    }
  }
}
