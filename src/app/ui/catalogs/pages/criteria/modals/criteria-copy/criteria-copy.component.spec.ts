import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaCopyComponent } from './criteria-copy.component';

describe('CriteriaCopyComponent', () => {
  let component: CriteriaCopyComponent;
  let fixture: ComponentFixture<CriteriaCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaCopyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
