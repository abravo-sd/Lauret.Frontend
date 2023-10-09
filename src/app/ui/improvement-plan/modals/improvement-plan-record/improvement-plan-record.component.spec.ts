import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementPlanRecordComponent } from './improvement-plan-record.component';

describe('ImprovementPlanRecordComponent', () => {
  let component: ImprovementPlanRecordComponent;
  let fixture: ComponentFixture<ImprovementPlanRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImprovementPlanRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementPlanRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
