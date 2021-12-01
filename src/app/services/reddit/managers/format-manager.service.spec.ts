import { TestBed } from '@angular/core/testing';

import { FormatManagerService } from './format-manager.service';

describe('FormatManagerService', () => {
  let service: FormatManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
