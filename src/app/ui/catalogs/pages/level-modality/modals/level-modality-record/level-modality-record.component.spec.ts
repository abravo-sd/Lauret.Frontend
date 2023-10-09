import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelModalityRecordComponent } from './level-modality-record.component';

describe('LevelModalityRecordComponent', () => {
  let component: LevelModalityRecordComponent;
  let fixture: ComponentFixture<LevelModalityRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelModalityRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelModalityRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
