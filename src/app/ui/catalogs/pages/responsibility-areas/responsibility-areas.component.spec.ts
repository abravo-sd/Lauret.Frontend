import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibilityAreasComponent } from './responsibility-areas.component';

describe('ResponsibilityAreasComponent', () => {
  let component: ResponsibilityAreasComponent;
  let fixture: ComponentFixture<ResponsibilityAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsibilityAreasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibilityAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
