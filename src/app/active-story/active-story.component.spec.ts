import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveStoryComponent } from './active-story.component';

describe('ActiveStoryComponent', () => {
  let component: ActiveStoryComponent;
  let fixture: ComponentFixture<ActiveStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
