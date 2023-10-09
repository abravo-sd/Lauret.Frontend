import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaRecordComponent } from './criteria-record.component';

describe('CriteriaRecordComponent', () => {
  let component: CriteriaRecordComponent;
  let fixture: ComponentFixture<CriteriaRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
