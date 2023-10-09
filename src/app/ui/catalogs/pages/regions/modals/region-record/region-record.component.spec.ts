import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionRecordComponent } from './region-record.component';

describe('RegionRecordComponent', () => {
  let component: RegionRecordComponent;
  let fixture: ComponentFixture<RegionRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegionRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
