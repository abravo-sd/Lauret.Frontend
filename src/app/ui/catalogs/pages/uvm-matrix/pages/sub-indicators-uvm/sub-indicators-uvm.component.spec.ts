import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubIndicatorsUvmComponent } from './sub-indicators-uvm.component';

describe('SubIndicatorsUvmComponent', () => {
  let component: SubIndicatorsUvmComponent;
  let fixture: ComponentFixture<SubIndicatorsUvmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubIndicatorsUvmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubIndicatorsUvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
