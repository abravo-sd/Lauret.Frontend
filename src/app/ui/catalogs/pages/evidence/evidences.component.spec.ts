import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidencesComponent } from './evidences.component';

describe('RegionsComponent', () => {
    let component: EvidencesComponent;
    let fixture: ComponentFixture<EvidencesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EvidencesComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EvidencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
