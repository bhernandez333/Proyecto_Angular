import { TestBed } from '@angular/core/testing';

import { Serv1Service } from './serv1.service';

describe('Serv1Service', () => {
  let service: Serv1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Serv1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
