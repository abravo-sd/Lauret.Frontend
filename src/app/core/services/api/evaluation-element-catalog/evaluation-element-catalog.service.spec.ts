import { TestBed } from '@angular/core/testing';

import { EvaluationElementCatalogService } from './evaluation-element-catalog.service';

describe('EvaluationElementCatalogService', () => {
  let service: EvaluationElementCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationElementCatalogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
