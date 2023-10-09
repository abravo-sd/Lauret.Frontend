import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyProcessComponent } from './copy-process.component';

describe('CopyProcessComponent', () => {
  let component: CopyProcessComponent;
  let fixture: ComponentFixture<CopyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CopyProcessComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
