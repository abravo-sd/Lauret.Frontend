import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentExecutionComponent } from './self-assessment-execution.component';

describe('SelfAssessmentExecutionComponent', () => {
  let component: SelfAssessmentExecutionComponent;
  let fixture: ComponentFixture<SelfAssessmentExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfAssessmentExecutionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
