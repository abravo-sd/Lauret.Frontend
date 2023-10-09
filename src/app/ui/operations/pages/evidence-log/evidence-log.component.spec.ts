import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceLogComponent } from './evidence-log.component';

describe('EvidenceLogComponent', () => {
  let component: EvidenceLogComponent;
  let fixture: ComponentFixture<EvidenceLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvidenceLogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
