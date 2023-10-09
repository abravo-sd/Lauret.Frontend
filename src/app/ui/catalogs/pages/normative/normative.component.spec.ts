import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormativeComponent } from './normative.component';

describe('NormativeComponent', () => {
  let component: NormativeComponent;
  let fixture: ComponentFixture<NormativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NormativeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NormativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
