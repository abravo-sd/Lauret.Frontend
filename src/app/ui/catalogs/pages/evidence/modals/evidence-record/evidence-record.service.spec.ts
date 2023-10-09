import { TestBed } from '@angular/core/testing';

import { EvidenceRecordService } from './evidence-record.service';

describe('RegionRecordService', () => {
    let service: EvidenceRecordService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EvidenceRecordService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
