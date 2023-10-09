import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentExecutionRecordComponent } from './self-assessment-execution-record.component';

describe('SelfAssessmentExecutionRecordComponent', () => {
  let component: SelfAssessmentExecutionRecordComponent;
  let fixture: ComponentFixture<SelfAssessmentExecutionRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfAssessmentExecutionRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentExecutionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
