import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateAreaRecordComponent } from './corporate-area-record.component';

describe('CorporateAreaRecordComponent', () => {
    let component: CorporateAreaRecordComponent;
    let fixture: ComponentFixture<CorporateAreaRecordComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CorporateAreaRecordComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CorporateAreaRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
