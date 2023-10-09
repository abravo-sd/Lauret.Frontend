import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativeRecordComponent } from './normative-record.component';

describe('NormativeRecordComponent', () => {
  let component: NormativeRecordComponent;
  let fixture: ComponentFixture<NormativeRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormativeRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativeRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
