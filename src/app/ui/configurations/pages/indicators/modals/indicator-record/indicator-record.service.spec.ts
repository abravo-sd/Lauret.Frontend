import { TestBed } from '@angular/core/testing';

import { IndicatorRecordService } from './indicator-record.service';

describe('IndicatorRecordService', () => {
    let service: IndicatorRecordService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IndicatorRecordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
