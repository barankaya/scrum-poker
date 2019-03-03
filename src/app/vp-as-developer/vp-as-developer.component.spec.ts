import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VpAsDeveloperComponent } from './vp-as-developer.component';

describe('VpAsDeveloperComponent', () => {
  let component: VpAsDeveloperComponent;
  let fixture: ComponentFixture<VpAsDeveloperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VpAsDeveloperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VpAsDeveloperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
