import { TestBed, inject } from '@angular/core/testing';

import { TaskHttpService } from './task-http.service';

describe('TaskHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskHttpService]
    });
  });

  it('should be created', inject([TaskHttpService], (service: TaskHttpService) => {
    expect(service).toBeTruthy();
  }));
});
