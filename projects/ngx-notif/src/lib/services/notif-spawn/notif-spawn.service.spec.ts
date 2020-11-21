import { TestBed } from '@angular/core/testing';

import { NotifSpawnService } from './notif-spawn.service';

describe('NotifSpawnService', () => {
  let service: NotifSpawnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifSpawnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
