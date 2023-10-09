import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsSiacComponent } from './indicators-siac.component';

describe('IndicatorsSiacComponent', () => {
  let component: IndicatorsSiacComponent;
  let fixture: ComponentFixture<IndicatorsSiacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorsSiacComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsSiacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
