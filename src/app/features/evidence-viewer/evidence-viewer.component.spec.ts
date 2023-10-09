import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceViewerComponent } from './evidence-viewer.component';

describe('EvidenceViewerComponent', () => {
  let component: EvidenceViewerComponent;
  let fixture: ComponentFixture<EvidenceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvidenceViewerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
