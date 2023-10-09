import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearchSimpleComponent } from './select-search-simple.component';

describe('SelectSearchSimpleComponent', () => {
  let component: SelectSearchSimpleComponent;
  let fixture: ComponentFixture<SelectSearchSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSearchSimpleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
