import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationElementRecordComponent } from './evaluation-element-record.component';

describe('EvaluationElementRecordComponent', () => {
  let component: EvaluationElementRecordComponent;
  let fixture: ComponentFixture<EvaluationElementRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationElementRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationElementRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
