import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { AddStoryListComponent } from './add-story-list/add-story-list.component';
import { VpAsDeveloperComponent } from './vp-as-developer/vp-as-developer.component';
import { VpAsScrumMasterComponent } from './vp-as-scrum-master/vp-as-scrum-master.component';
import { GlobalHelper } from './helpers/GlobalHelper';
import { DataService } from './services/data.service';
import { StoryTableComponent } from './story-table/story-table.component';
import { ActiveStoryComponent } from './active-story/active-story.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddStoryListComponent,
    VpAsDeveloperComponent,
    VpAsScrumMasterComponent,
    StoryTableComponent,
    ActiveStoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    Ng2SmartTableModule
  ],
  providers: [
    GlobalHelper,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
