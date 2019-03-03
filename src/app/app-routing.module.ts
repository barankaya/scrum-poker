import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoryListComponent } from './add-story-list/add-story-list.component';
import { VpAsDeveloperComponent } from './vp-as-developer/vp-as-developer.component';
import { VpAsScrumMasterComponent } from './vp-as-scrum-master/vp-as-scrum-master.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'poker-planning-add-story-list',
    pathMatch: 'full'
  },
  {
      path: 'poker-planning-add-story-list',
      component: AddStoryListComponent,
  },
  {
      path: 'poker-planning-view-as-developer',
      component: VpAsDeveloperComponent
  },
  {
      path: 'poker-planning-view-as-developer/:id',
      component: VpAsDeveloperComponent
  },
  {
      path: 'poker-planning-view-as-scrum-master',
      component: VpAsScrumMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
