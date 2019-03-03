import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalHelper } from '../helpers/GlobalHelper';

@Component({
  selector: 'app-vp-as-developer',
  templateUrl: './vp-as-developer.component.html',
  styleUrls: ['./vp-as-developer.component.scss']
})
export class VpAsDeveloperComponent implements OnInit {
  sessionId = undefined;
  isScrumMasterUser = 0;

  constructor(private route: ActivatedRoute, public globalHelper: GlobalHelper) {
    this.route.params.subscribe(res => this.sessionId = res.id);
    console.log(this.sessionId);
  }

  ngOnInit() {
  }

}
