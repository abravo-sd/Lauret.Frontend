import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationPeriodRecordComponent } from './evaluation-period-record.component';

describe('EvaluationPeriodRecordComponent', () => {
  let component: EvaluationPeriodRecordComponent;
  let fixture: ComponentFixture<EvaluationPeriodRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationPeriodRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationPeriodRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
