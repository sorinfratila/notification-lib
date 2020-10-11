import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifContainerComponent } from './notif-container.component';

describe('NotifContainerComponent', () => {
  let component: NotifContainerComponent;
  let fixture: ComponentFixture<NotifContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotifContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
