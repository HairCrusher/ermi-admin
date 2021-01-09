import { TestBed } from '@angular/core/testing';

import { WheelSizeService } from './wheel-size.service';

describe('WheelSizeService', () => {
  let service: WheelSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WheelSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
