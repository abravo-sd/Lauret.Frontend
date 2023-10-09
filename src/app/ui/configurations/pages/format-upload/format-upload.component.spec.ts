import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormatUploadComponent } from './format-upload.component';

describe('FormatUploadComponent', () => {
  let component: FormatUploadComponent;
  let fixture: ComponentFixture<FormatUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormatUploadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormatUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
