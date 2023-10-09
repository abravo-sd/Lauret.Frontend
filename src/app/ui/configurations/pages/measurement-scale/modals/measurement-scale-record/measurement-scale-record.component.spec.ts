import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementScaleRecordComponent } from './measurement-scale-record.component';

describe('MeasurementScaleRecordComponent', () => {
  let component: MeasurementScaleRecordComponent;
  let fixture: ComponentFixture<MeasurementScaleRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeasurementScaleRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementScaleRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
