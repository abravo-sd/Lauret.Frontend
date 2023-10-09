import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditorRecordComponent } from './accreditor-record.component';

describe('AccreditorRecordComponent', () => {
  let component: AccreditorRecordComponent;
  let fixture: ComponentFixture<AccreditorRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccreditorRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditorRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
