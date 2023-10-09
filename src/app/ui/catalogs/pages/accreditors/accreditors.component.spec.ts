import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditorsComponent } from './accreditors.component';

describe('AccreditorsComponent', () => {
  let component: AccreditorsComponent;
  let fixture: ComponentFixture<AccreditorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccreditorsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccreditorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
