import { TestBed } from '@angular/core/testing';

import { EvaluationElementService } from './evaluation-element.service';

describe('EvaluationElementService', () => {
  let service: EvaluationElementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluationElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
