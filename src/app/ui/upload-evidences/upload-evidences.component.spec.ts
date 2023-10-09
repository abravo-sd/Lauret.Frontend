import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadEvidencesComponent } from './upload-evidences.component';

describe('UploadEvidencesComponent', () => {
  let component: UploadEvidencesComponent;
  let fixture: ComponentFixture<UploadEvidencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadEvidencesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadEvidencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
