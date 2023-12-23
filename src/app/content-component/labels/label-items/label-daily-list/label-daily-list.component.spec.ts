import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDailyListComponent } from './label-daily-list.component';

describe('LabelDailyListComponent', () => {
  let component: LabelDailyListComponent;
  let fixture: ComponentFixture<LabelDailyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LabelDailyListComponent]
    });
    fixture = TestBed.createComponent(LabelDailyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
