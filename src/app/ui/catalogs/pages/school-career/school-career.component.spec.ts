import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolCareerComponent } from './school-career.component';

describe('SchoolCareerComponent', () => {
  let component: SchoolCareerComponent;
  let fixture: ComponentFixture<SchoolCareerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchoolCareerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
