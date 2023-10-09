import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEvidencesRecordComponent } from './upload-evidences-record.component';

describe('UploadEvidencesRecordComponent', () => {
  let component: UploadEvidencesRecordComponent;
  let fixture: ComponentFixture<UploadEvidencesRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadEvidencesRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEvidencesRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
