import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideorecordComponent } from './videorecord.component';

describe('VideorecordComponent', () => {
  let component: VideorecordComponent;
  let fixture: ComponentFixture<VideorecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideorecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideorecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
