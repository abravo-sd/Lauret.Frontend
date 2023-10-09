import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusRecordComponent } from './campus-record.component';

describe('CampusRecordComponent', () => {
  let component: CampusRecordComponent;
  let fixture: ComponentFixture<CampusRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampusRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampusRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
