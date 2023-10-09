import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorSiacRecordComponent } from './indicator-siac-record.component';

describe('IndicatorSiacRecordComponent', () => {
  let component: IndicatorSiacRecordComponent;
  let fixture: ComponentFixture<IndicatorSiacRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorSiacRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSiacRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
