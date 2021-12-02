import { TestBed } from '@angular/core/testing';

import { PostsManagerService } from './posts-manager.service';

describe('PostsManagerService', () => {
  let service: PostsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
