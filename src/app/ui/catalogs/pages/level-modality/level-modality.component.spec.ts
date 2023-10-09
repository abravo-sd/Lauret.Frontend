import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelModalityComponent } from './level-modality.component';

describe('LevelModalityComponent', () => {
  let component: LevelModalityComponent;
  let fixture: ComponentFixture<LevelModalityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LevelModalityComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelModalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
