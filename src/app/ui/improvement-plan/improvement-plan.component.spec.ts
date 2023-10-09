import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementPlanComponent } from './improvement-plan.component';

describe('ImprovementPlanComponent', () => {
  let component: ImprovementPlanComponent;
  let fixture: ComponentFixture<ImprovementPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImprovementPlanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
