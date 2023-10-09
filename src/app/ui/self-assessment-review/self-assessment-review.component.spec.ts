import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentReviewComponent } from './self-assessment-review.component';

describe('SelfAssessmentReviewComponent', () => {
  let component: SelfAssessmentReviewComponent;
  let fixture: ComponentFixture<SelfAssessmentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfAssessmentReviewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
