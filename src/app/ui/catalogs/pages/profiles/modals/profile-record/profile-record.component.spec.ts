import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecordComponent } from './profile-record.component';

describe('ProfileRecordComponent', () => {
  let component: ProfileRecordComponent;
  let fixture: ComponentFixture<ProfileRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
