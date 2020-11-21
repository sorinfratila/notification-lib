import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotifComponent } from '../ngx-notif.component';

describe('NgxNotifComponent', () => {
  let component: NgxNotifComponent;
  let fixture: ComponentFixture<NgxNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
