import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpAsScrumMasterComponent } from './vp-as-scrum-master.component';

describe('VpAsScrumMasterComponent', () => {
  let component: VpAsScrumMasterComponent;
  let fixture: ComponentFixture<VpAsScrumMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpAsScrumMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpAsScrumMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
