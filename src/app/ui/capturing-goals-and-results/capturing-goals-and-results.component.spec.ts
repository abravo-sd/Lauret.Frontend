import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapturingGoalsAndResultsComponent } from './capturing-goals-and-results.component';

describe('CapturingGoalsAndResultsComponent', () => {
  let component: CapturingGoalsAndResultsComponent;
  let fixture: ComponentFixture<CapturingGoalsAndResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CapturingGoalsAndResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturingGoalsAndResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
