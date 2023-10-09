import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralConfigurationRecordComponent } from './general-configuration-record.component';

describe('GeneralConfigurationRecordComponent', () => {
  let component: GeneralConfigurationRecordComponent;
  let fixture: ComponentFixture<GeneralConfigurationRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralConfigurationRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralConfigurationRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
