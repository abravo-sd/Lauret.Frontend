import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRecordComponent } from './site-record.component';

describe('SiteRecordComponent', () => {
  let component: SiteRecordComponent;
  let fixture: ComponentFixture<SiteRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteRecordComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
