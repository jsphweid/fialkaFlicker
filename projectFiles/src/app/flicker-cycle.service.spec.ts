/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlickerCycleService } from './flicker-cycle.service';

describe('Service: FlickerCycle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlickerCycleService]
    });
  });

  it('should ...', inject([FlickerCycleService], (service: FlickerCycleService) => {
    expect(service).toBeTruthy();
  }));
});
