import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceLogRecordComponent } from './evidence-log-record.component';

describe('EvidenceLogRecordComponent', () => {
  let component: EvidenceLogRecordComponent;
  let fixture: ComponentFixture<EvidenceLogRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvidenceLogRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceLogRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
