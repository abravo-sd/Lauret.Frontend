import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsAndMonitoringComponent } from './reports-and-monitoring.component';

describe('ReportsAndMonitoringComponent', () => {
  let component: ReportsAndMonitoringComponent;
  let fixture: ComponentFixture<ReportsAndMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportsAndMonitoringComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsAndMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
