import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { INotif, NgxNotifService } from '../services/notif/ngx-notif.service';

const options = {
  minute: 'numeric',
  hour: 'numeric',
};

@Component({
  selector: 'lib-notif',
  templateUrl: './ngx-notif.component.html',
  styleUrls: ['./ngx-notif.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NgxNotifComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() notification: INotif;
  @Input() index: number;
  @Output() closeNotif: EventEmitter<any> = new EventEmitter();

  timeout: any;
  now: string; // used to keep time of unconfirmed notifications

  constructor(private notifService: NgxNotifService) {}

  ngOnInit(): void {
    this.now = new Date().toLocaleDateString('en-UK', options).slice(-5);
  }

  ngAfterViewInit(): void {
    this.initTimeout();
  }

  ngOnDestroy(): void {
    this.clearTimeout();
  }

  /**
   * Method used for initializing notification timeout if the notifications has a timeout
   */
  initTimeout(): void {
    if (this.notification.confirmed) {
      this.timeout = setTimeout(() => {
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
      notification: this.notification,
    });

    event.preventDefault();
  }
}
