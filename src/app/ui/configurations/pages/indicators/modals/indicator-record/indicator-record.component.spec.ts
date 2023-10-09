import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorRecordComponent } from './indicator-record.component';

describe('IndicatorRecordComponent', () => {
  let component: IndicatorRecordComponent;
  let fixture: ComponentFixture<IndicatorRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
