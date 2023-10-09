import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentUvmRecordComponent } from './component-uvm-record.component';

describe('ComponentUvmRecordComponent', () => {
  let component: ComponentUvmRecordComponent;
  let fixture: ComponentFixture<ComponentUvmRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentUvmRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentUvmRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
