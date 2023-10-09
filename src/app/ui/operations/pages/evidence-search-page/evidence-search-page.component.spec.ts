import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceSearchPageComponent } from './evidence-search-page.component';

describe('EvidenceSearchPageComponent', () => {
  let component: EvidenceSearchPageComponent;
  let fixture: ComponentFixture<EvidenceSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvidenceSearchPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvidenceSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
