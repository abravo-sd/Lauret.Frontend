import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightRecordComponent } from './weight-record.component';

describe('WeightRecordComponent', () => {
  let component: WeightRecordComponent;
  let fixture: ComponentFixture<WeightRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
