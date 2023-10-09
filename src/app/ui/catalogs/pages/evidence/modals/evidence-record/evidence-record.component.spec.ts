import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvidenceRecordComponent } from './evidence-record.component';

describe('EvidenceRecordComponent', () => {
    let component: EvidenceRecordComponent;
    let fixture: ComponentFixture<EvidenceRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EvidenceRecordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EvidenceRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
