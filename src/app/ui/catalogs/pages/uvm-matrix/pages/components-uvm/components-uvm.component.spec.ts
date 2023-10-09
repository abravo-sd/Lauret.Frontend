import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsUvmComponent } from './components-uvm.component';

describe('ComponentsUvmComponent', () => {
  let component: ComponentsUvmComponent;
  let fixture: ComponentFixture<ComponentsUvmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentsUvmComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsUvmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
