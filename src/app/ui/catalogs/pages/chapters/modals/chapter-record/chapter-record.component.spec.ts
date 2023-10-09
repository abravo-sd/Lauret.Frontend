import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterRecordComponent } from './chapter-record.component';

describe('ChapterRecordComponent', () => {
  let component: ChapterRecordComponent;
  let fixture: ComponentFixture<ChapterRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
