import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAreasComponent } from './corporate-areas.component';

describe('CorporateAreasComponent', () => {
  let component: CorporateAreasComponent;
  let fixture: ComponentFixture<CorporateAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CorporateAreasComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
