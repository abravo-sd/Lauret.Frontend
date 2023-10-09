import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIndicatorUvmRecordComponent } from './sub-indicator-uvm-record.component';

describe('SubIndicatorUvmRecordComponent', () => {
  let component: SubIndicatorUvmRecordComponent;
  let fixture: ComponentFixture<SubIndicatorUvmRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubIndicatorUvmRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubIndicatorUvmRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
