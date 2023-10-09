import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsRecordComponent } from './component-record.component';

describe('ComponentsRecordComponent', () => {
  let component: ComponentsRecordComponent;
  let fixture: ComponentFixture<ComponentsRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentsRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
