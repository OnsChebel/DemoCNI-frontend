import { TestBed } from '@angular/core/testing';

import { ParticipantModel } from './participant.service';

describe('ParticipantModel', () => {
  let service: Participant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Participant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
