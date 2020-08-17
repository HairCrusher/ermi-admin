import { TestBed } from '@angular/core/testing';

import { AttrSetService } from './attr-set.service';

describe('AttrSetService', () => {
  let service: AttrSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttrSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
