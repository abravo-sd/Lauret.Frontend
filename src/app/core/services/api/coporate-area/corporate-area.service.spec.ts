import { CorporateAreaService } from './corporate-area.service';

describe('CorporateAreaService', () => {
  let service: CorporateAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CorporateAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
