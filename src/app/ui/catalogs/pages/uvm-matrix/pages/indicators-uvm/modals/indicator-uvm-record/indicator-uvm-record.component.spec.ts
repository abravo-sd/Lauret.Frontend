import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorUvmRecordComponent } from './indicator-uvm-record.component';

describe('IndicatorUvmRecordComponent', () => {
  let component: IndicatorUvmRecordComponent;
  let fixture: ComponentFixture<IndicatorUvmRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorUvmRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorUvmRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
