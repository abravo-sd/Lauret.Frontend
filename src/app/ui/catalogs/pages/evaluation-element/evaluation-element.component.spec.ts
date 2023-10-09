import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationElementComponent } from './evaluation-element.component';

describe('EvaluationElementComponent', () => {
  let component: EvaluationElementComponent;
  let fixture: ComponentFixture<EvaluationElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluationElementComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
