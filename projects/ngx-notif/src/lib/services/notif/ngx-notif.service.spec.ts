import { TestBed } from '@angular/core/testing';

import { NgxNotifService } from '../../ngx-notif.service';

describe('NgxNotifService', () => {
  let service: NgxNotifService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotifService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
