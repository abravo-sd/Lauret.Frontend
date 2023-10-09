import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSearchGroupComponent } from './select-search-group.component';

describe('SelectSearchGroupComponent', () => {
  let component: SelectSearchGroupComponent;
  let fixture: ComponentFixture<SelectSearchGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectSearchGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
