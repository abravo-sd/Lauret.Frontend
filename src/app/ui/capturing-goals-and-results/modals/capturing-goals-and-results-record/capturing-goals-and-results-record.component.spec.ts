import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturingGoalsAndResultsRecordComponent } from './capturing-goals-and-results-record.component';

describe('CapturingGoalsAndResultsRecordComponent', () => {
  let component: CapturingGoalsAndResultsRecordComponent;
  let fixture: ComponentFixture<CapturingGoalsAndResultsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturingGoalsAndResultsRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturingGoalsAndResultsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
