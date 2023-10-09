import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEvidenceRecordComponent } from './register-evidence-record.component';

describe('RegisterEvidenceRecordComponent', () => {
  let component: RegisterEvidenceRecordComponent;
  let fixture: ComponentFixture<RegisterEvidenceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterEvidenceRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterEvidenceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
