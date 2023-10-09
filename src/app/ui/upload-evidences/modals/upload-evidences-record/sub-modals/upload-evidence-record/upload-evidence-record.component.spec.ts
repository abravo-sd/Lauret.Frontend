import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubUploadEvidenceRecordComponent } from './upload-evidence-record.component';

describe('UploadEvidenceRecordComponent', () => {
  let component: SubUploadEvidenceRecordComponent;
  let fixture: ComponentFixture<SubUploadEvidenceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubUploadEvidenceRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubUploadEvidenceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
