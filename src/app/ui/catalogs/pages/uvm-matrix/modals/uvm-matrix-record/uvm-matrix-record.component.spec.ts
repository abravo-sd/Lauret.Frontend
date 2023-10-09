import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvmMatrixRecordComponent } from './uvm-matrix-record.component';

describe('UvmMatrixRecordComponent', () => {
  let component: UvmMatrixRecordComponent;
  let fixture: ComponentFixture<UvmMatrixRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UvmMatrixRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvmMatrixRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
