import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UvmMatrixComponent } from './uvm-matrix.component';

describe('UvmMatrixComponent', () => {
  let component: UvmMatrixComponent;
  let fixture: ComponentFixture<UvmMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UvmMatrixComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UvmMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
