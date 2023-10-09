import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsUvmComponent } from './indicators-uvm.component';

describe('IndicatorsUvmComponent', () => {
  let component: IndicatorsUvmComponent;
  let fixture: ComponentFixture<IndicatorsUvmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorsUvmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsUvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
