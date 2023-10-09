import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyResultModalComponent } from './copy-result-modal.component';

describe('CopyResultModalComponent', () => {
  let component: CopyResultModalComponent;
  let fixture: ComponentFixture<CopyResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyResultModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
