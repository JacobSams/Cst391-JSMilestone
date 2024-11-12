import { TestBed } from '@angular/core/testing';

import { GameDAOService } from './game-dao.service';

describe('GameDAOService', () => {
  let service: GameDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
