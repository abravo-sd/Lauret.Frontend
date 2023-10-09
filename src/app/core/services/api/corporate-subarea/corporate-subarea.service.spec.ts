import { CorporateSubAreaService } from './corporate-subarea.service';

describe('CorporateAreaService', () => {
  let service: CorporateSubAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateSubAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
