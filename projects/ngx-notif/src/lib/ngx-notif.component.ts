import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {INotif, NgxNotifService} from './ngx-notif.service';
import * as moment from 'moment';

@Component({
  selector: 'lib-notif',
  template: `
    <div class="notification__item {{ notification.severity }} large">
      <div class="notification__item__content">
        <i class="material-icons-outlined medium margin__right">{{ notification.severity === 'warning' ? 'report_problem' : 'info' }}</i>
        <div class="notification__item__text">
          <p class="notification__item__message">{{ notification.message }}</p>
          <p class="notification__item__date" *ngIf="!notification.confirmed" [innerText]="relativeTime"></p>
        </div>
        <button
          class="button notification__item__btn"
          (click)="onOKClick($event)"
          *ngIf="!notification.confirmed"
        >
          <span class="btn__text">OK</span>
        </button>
      </div>
    </div>

  `,
  styleUrls: ['./ngx-notif.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class NgxNotifComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() notification: INotif;
  @Input() index: number;

  @Output() closeNotif: EventEmitter<any> = new EventEmitter();

  timeout: any;
  relativeTime: string; // used to keep time of unconfirmed notifications

  constructor(private notifService: NgxNotifService) { }

  ngOnInit(): void {
    this.relativeTime = moment(this.notification.createdAt).fromNow();
    this.timeElapsed();
  }

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  /**
   * Method used to start a timer that is shown on the unconfirmed notifications
   */
  timeElapsed(): void {
    setInterval(() => {
      this.relativeTime = moment(this.notification.createdAt).fromNow();
    }, 60000);
  }

  /**
   * Method used for initializing notification timeout if the notifications has a timeout
   */
  initTimeout(): void {
    if (this.notification.confirmed) {
      this.timeout = setTimeout(() => {
        // console.warn('timeout passed');
        this.closeNotif.emit({
          index: this.index,
          notification: this.notification,
          timedOut: true,
        });
      }, this.notification.timeout || 5000);
    }
  }

  /**
   * Method used for clearing the timeout
   */
  clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Method used for closing( confirming ) the notification
   */
  onOKClick(event: any): void {
    this.notifService.removeGroupedNotification(this.notification.id);
    this.closeNotif.emit({
      index: this.index,
      notification: this.notification
    });

    event.preventDefault();
  }
}
