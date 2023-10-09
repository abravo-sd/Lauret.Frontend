import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentReviewRecordComponent } from './self-assessment-review-record.component';

describe('SelfAssessmentReviewRecordComponent', () => {
  let component: SelfAssessmentReviewRecordComponent;
  let fixture: ComponentFixture<SelfAssessmentReviewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfAssessmentReviewRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentReviewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
