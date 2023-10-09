import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionRecordComponent } from './institution-record.component';

describe('InstitutionRecordComponent', () => {
  let component: InstitutionRecordComponent;
  let fixture: ComponentFixture<InstitutionRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstitutionRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
