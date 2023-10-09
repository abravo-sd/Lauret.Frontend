import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCareerRecordComponent } from './school-career-record.component';

describe('SchoolCareerRecordComponent', () => {
  let component: SchoolCareerRecordComponent;
  let fixture: ComponentFixture<SchoolCareerRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolCareerRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCareerRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
