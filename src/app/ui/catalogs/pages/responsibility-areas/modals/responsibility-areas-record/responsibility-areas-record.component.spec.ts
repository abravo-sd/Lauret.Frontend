import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityAreasRecordComponent } from './responsibility-areas-record.component';

describe('ResponsibilityAreasRecordComponent', () => {
  let component: ResponsibilityAreasRecordComponent;
  let fixture: ComponentFixture<ResponsibilityAreasRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsibilityAreasRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilityAreasRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
